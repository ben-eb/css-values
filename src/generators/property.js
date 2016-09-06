import * as t from 'babel-types';
import * as validators from '../validators';
import arrayOfStrings from '../util/arrayOfStrings';
import {notCallExpression, callExpression} from '../util/callExpressions';
import {ifAllTruthy, ifAnyTruthy, anyTruthy, allTruthy} from '../util/conditionals';
import {createConst, createLet} from '../util/createVariable';
import dataValidator from '../util/dataValidator';
import globals from '../util/globals';
import importMethod from '../util/importMethod';
import template from '../util/moduleTemplate';
import {returnTrue, returnFalse} from '../util/returnBooleans';
import templateExpression from '../util/templateExpression';
import generateProgram from './program';
import requireModules from './requireModules';
import validator from './validator';

/*
 * Common Babel nodes.
 */

const lengthIdentifier = t.identifier('length');
const nodeIdentifier   = t.identifier('node');
const validIdentifier  = t.identifier('valid');

const valueParserASTNodes = t.memberExpression(
    t.identifier('valueParserAST'),
    t.identifier('nodes')
);

const firstValueParserNode = createConst(
    nodeIdentifier,
    t.memberExpression(
        valueParserASTNodes,
        t.numericLiteral(0),
        true
    )
);

/**
 * Test that the nodes from postcss-value-parser is a certain length. This
 * uses strict equality by default, but you can supply an alternate operator.
 *
 * @private
 * @param  {number} length          The length to check
 * @param  {type} operator = '==='  The operator to use.
 * @return {Babel}                  The binary expression.
 * @example
 * const equality = valueParserNodesLength(5);
 * //=> valueParserAST.nodes.length === 5;
 *
 * const lessThan = valueParserNodesLength(5, '<');
 * //=> valueParserAST.nodes.length < 5;
 */

function valueParserNodesLength (length, operator = '===') {
    return t.binaryExpression(
        operator,
        t.memberExpression(
            valueParserASTNodes,
            lengthIdentifier
        ),
        t.numericLiteral(length)
    );
}

const dependencies = {
    valueParser: 'postcss-value-parser',
    isKeyword: './validators/isKeyword',
    isVariable: './validators/isVariable',
};

function addDependency (dep) {
    if (!dependencies[dep]) {
        dependencies[dep] = `./validators/${dep}`;
    }
}

function generatePositionValidator ({candidates, identifier}) {
    const func = 'isPosition';
    addDependency(func);
    return createConst(t.identifier(identifier), callExpression(
        func,
        t.booleanLiteral(candidates[0].separator === ',')
    ));
}

function genericValidatorStub (name, {identifier}) {
    addDependency(name);
    return createConst(t.identifier(identifier), t.identifier(name));
}

function keyword (config, candidate) {
    config.keywords.push(candidate.value);
    return config;
}

function dataString (config, candidate) {
    const camel = candidate.type === 'string' ? 'isString' : dataValidator(candidate.value);
    if (!validators[camel]) {
        return config;
    }
    addDependency(camel);
    if (camel === 'isPosition') {
        config.preConditions.push(
            template(`if (${camel}(true)(valueParserAST)) { return true; }`)()
        );
        return config;
    }
    if (camel === 'isTransformList' || camel === 'isShadowT' || camel === 'isFilterFunctionList') {
        config.preConditions.push(
            template(`if (${camel}(valueParserAST)) { return true; }`)()
        );
        return config;
    }
    if (candidate.min === 1) {
        const method = candidate.separator === ',' ? 'isComma' : 'isSpace';
        addDependency(method);
        addDependency('isEven');
        config.repeatingConditions.push(
            ifAnyTruthy([
                allTruthy(
                    templateExpression(`even`),
                    allTruthy(
                        notCallExpression(camel, nodeIdentifier),
                        notCallExpression('isVariable', nodeIdentifier)
                    ),
                ),
                allTruthy(
                    templateExpression(`!even`),
                    notCallExpression(method, nodeIdentifier)
                ),
            ], [
                t.expressionStatement(
                    t.assignmentExpression(
                        '=',
                        validIdentifier,
                        t.booleanLiteral(false)
                    ),
                ),
            ])
        );
        const tmpl = `return valid && !isEven(valueParserAST.nodes.length)`;
        if (candidate.max !== false) {
            config.repeatingReturn = template(`${tmpl} && len;`)({
                len: valueParserNodesLength((candidate.max * 2) - 1, '<='),
            });
        } else {
            config.repeatingReturn = template(`${tmpl};`)();
        }

        return config;
    }
    config.conditions.push(callExpression(camel, nodeIdentifier));
    return config;
}

const candidateTypes = {
    keyword,
    data: dataString,
    string: dataString,
};

function createValidator (opts) {
    if (opts.candidates.length === 1) {
        const {value} = opts.candidates[0];
        switch (value) {
        case 'bg-size':
        case 'repeat-style':
            return genericValidatorStub(dataValidator(value), opts);
        case 'position':
            return generatePositionValidator(opts);
        }
    }
    const settings = opts.candidates.reduce((config, candidate) => {
        const {type} = candidate;
        if (candidateTypes[type]) {
            return candidateTypes[type](config, candidate);
        }
        return config;
    }, {
        keywords: [],
        conditions: [],
        preConditions: [],
        repeatingConditions: [],
        repeatingReturn: false,
    });

    let keywords = [];

    if (settings.keywords.length) {
        /*
         * This handles the simplest case; where the grammar defines a list
         * of keywords and nothing else. In this case we can use the
         * isKeywordFactory function which saves us from having to generate
         * a validator ourselves. It produces output such as:
         *
         * const property = isKeywordFactory(['foo', 'bar', 'baz']);
         */
        if (
            !settings.conditions.length &&
            !settings.preConditions.length &&
            !settings.repeatingConditions.length
        ) {
            const identifier = 'isKeywordFactory';
            addDependency(identifier);
            return [
                createConst(t.identifier(opts.identifier), callExpression(
                    identifier,
                    arrayOfStrings(settings.keywords.filter(Boolean))
                )),
            ];
        }
        /*
         * Otherwise, we need to generate a list of keywords that are used
         * as another validation condition. If we only have one keyword,
         * this can be inlined inside the `isKeyword` function - i.e.
         * `isKeyword(node, 'foo')`. Otherwise, we create a new list
         * and use it as a reference - `isKeyword(node, propertyKeywords)`,
         * where `propertyKeywords` is `const propertyKeywords = ['foo', 'bar']`
         */
        const keywordsList = t.identifier(`${opts.identifier}Keywords`);
        const list = settings.keywords.length === 1 ? t.stringLiteral(settings.keywords[0]) : keywordsList;
        settings.conditions.push(callExpression('isKeyword', nodeIdentifier, list));
        if (settings.keywords.length > 1) {
            keywords.push(createConst(
                keywordsList,
                arrayOfStrings(settings.keywords.filter(Boolean))
            ));
        }
    }

    if (settings.repeatingConditions.length) {
        addDependency('isEven');

        let body = [];

        if (settings.conditions.length) {
            body.push(
                firstValueParserNode,
                ifAllTruthy([
                    valueParserNodesLength(1),
                    ...settings.conditions,
                ], [
                    returnTrue,
                ])
            );
        }

        body.push(createLet(
            validIdentifier,
            t.booleanLiteral(true)
        ));

        if (settings.preConditions.length) {
            body.push(settings.preConditions);
        }

        body.push(
            template('valueParserAST.walk((node, index) => { const even = isEven(index); CONDITIONS; return false; });')({
                CONDITIONS: settings.repeatingConditions,
            })
        );

        if (settings.repeatingReturn) {
            body.push(settings.repeatingReturn);
        }

        return validator(opts.identifier, keywords, body);
    }

    const block = settings.conditions.length ? [
        firstValueParserNode,
        t.returnStatement(anyTruthy(...settings.conditions)),
    ] : [
        returnTrue,
    ];

    return validator(opts.identifier, keywords, [
        ...(settings.preConditions.length ? settings.preConditions : t.emptyStatement()),
        t.ifStatement(
            valueParserNodesLength(1),
            t.blockStatement(block)
        ),
        returnFalse,
    ]);
}

function generateValidatorMap (config) {
    const validatorMap = config.reduce((map, {identifier, properties}) => {
        properties.forEach(property => {
            if (map[property]) {
                return;
            }
            map[property] = identifier;
        });
        return map;
    }, {});
    return createConst(
        t.identifier('validators'),
        t.objectExpression(Object.keys(validatorMap).sort().map(key => {
            return t.objectProperty(
                t.stringLiteral(key),
                t.identifier(validatorMap[key])
            );
        }))
    );
}

export default config => {
    const funcs = config.reduce((list, descriptor) => {
        const fn = createValidator(descriptor);
        if (fn) {
            return [...list, fn];
        }
        return list;
    }, []);
    return generateProgram([
        requireModules(...Object.keys(dependencies).map(key => {
            return {
                identifier: key,
                module: dependencies[key],
            };
        })),
        t.importDeclaration([
            importMethod(t.identifier('invalidMessage')),
            importMethod(t.identifier('unknownMessage')),
        ], t.stringLiteral('./util/validationMessages')),
        ...funcs,
        generateValidatorMap(config),
        createConst(
            t.identifier('cssGlobals'),
            arrayOfStrings(globals)
        ),
        template(`
            /**
             * The main entry point of this module takes a CSS property/value
             * pair, and validates it. It will return either \`true\` if valid,
             * or a message object if either invalid or unknown.
             *
             * @param {string} property The CSS property to validate.
             * @param {string|valueParser} value Either a string or an AST yielded
             * by postcss-value-parser.
             * @return {boolean|object}
             * @example <caption>Valid CSS (string)</caption>
             * import cssValues from 'css-values';
             *
             * cssValues('color', 'transparent');
             * //=> true
             * @example <caption>Valid CSS (valueParser)</caption>
             * import valueParser from 'postcss-value-parser';
             * import cssValues from 'css-values';
             *
             * cssValues('color', valueParser('transparent'));
             * //=> true
             * @example <caption>Invalid CSS (string, recognised properties)</caption>
             * import cssValues from 'css-values';
             *
             * cssValues('color', 'traansparent');
             * //=> {type: 'invalid', message: '"traansparent" is not a valid value for "color".'}
             * @example <caption>Invalid CSS (string, unknown properties)</caption>
             * import cssValues from 'css-values';
             *
             * cssValues('colr', 'transparent');
             * //=> {type: 'unknown', message: '"colr" is not a recognised property.'}
             */
            export default function cssValues (property, value) {
                if (typeof value === 'string') {
                    value = valueParser(value);
                }
                const first = value.nodes[0];
                if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVariable(first))) {
                    return true;
                }
                if (validators[property]) {
                    if (!!validators[property](value) === false) {
                        return invalidMessage('"' + value + '" is not a valid value for "' + property + '".');
                    }
                    return true;
                }
                // Pass through unknown properties
                return unknownMessage('"' + property + '" is not a recognised property.');
            }
        `, {preserveComments: true})(),
    ]);
};
