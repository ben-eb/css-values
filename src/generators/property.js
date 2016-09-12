import * as t from 'babel-types';
import plur from 'plur';
import * as validators from '../validators';
import arrayOfStrings from '../util/arrayOfStrings';
import {notCallExpression, callExpression} from '../util/callExpressions';
import {ifAllTruthy, ifAnyTruthy, allTruthy} from '../util/conditionals';
import {createConst, createLet} from '../util/createVariable';
import dataValidator from '../util/dataValidator';
import globals from '../util/globals';
import importMethod from '../util/importMethod';
import template from '../util/moduleTemplate';
import {returnFalse} from '../util/returnBooleans';
import generateProgram from './program';
import requireModules from './requireModules';
import validator from './validator';
import validatorMap from './validatorMap';

/*
 * Common Babel nodes.
 */

const evenIdentifier           = t.identifier('even');
const indexIdentifier          = t.identifier('index');
const lengthIdentifier         = t.identifier('length');
const nodeIdentifier           = t.identifier('node');
const validIdentifier          = t.identifier('valid');
const valueParserASTIdentifier = t.identifier('valueParserAST');

const valueParserASTNodes = t.memberExpression(
    valueParserASTIdentifier,
    t.identifier('nodes')
);

const valueParserASTNodesLength = t.memberExpression(
    valueParserASTNodes,
    lengthIdentifier
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
 * Test that the nodes from postcss-value-parser are a certain length. This
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
        valueParserASTNodesLength,
        t.numericLiteral(length)
    );
}

function getValidatorResult (identifier, cache) {
    const result = t.identifier(`${identifier}Result`);
    return [
        createConst(result, cache),
        t.ifStatement(
            t.binaryExpression(
                '!==',
                t.unaryExpression('!', t.unaryExpression('!', result)),
                t.booleanLiteral(false)
            ),
            t.blockStatement([
                t.returnStatement(result),
            ])
        ),
    ];
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
    const func = candidates[0].separator === ',' ? 'isPositionRepeat' : 'isPositionNoRepeat';
    return createConst(t.identifier(identifier), t.identifier(func));
}

function genericValidatorStub (name, {identifier}) {
    addDependency(name);
    return createConst(t.identifier(identifier), t.identifier(name));
}

function keyword (config, {value}) {
    config.keywords.push(value);
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
            ...getValidatorResult(camel, callExpression('isPositionRepeat', valueParserASTIdentifier))
        );
        return config;
    }
    if (camel === 'isTransformList' || camel === 'isShadowT' || camel === 'isFilterFunctionList') {
        config.preConditions.push(
            ...getValidatorResult(camel, callExpression(camel, valueParserASTIdentifier))
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
                    evenIdentifier,
                    allTruthy(
                        notCallExpression(camel, nodeIdentifier),
                        notCallExpression('isVariable', nodeIdentifier)
                    ),
                ),
                allTruthy(
                    t.unaryExpression('!', evenIdentifier),
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
        config.repeatingReturn = [
            t.returnStatement(allTruthy(
                validIdentifier,
                notCallExpression('isEven', valueParserASTNodesLength)
            )),
        ];
        if (candidate.max !== false) {
            config.preConditions.push(
                t.ifStatement(
                    valueParserNodesLength((candidate.max * 2) - 1, '>'),
                    t.blockStatement([
                        t.returnStatement(callExpression(
                            'invalidMessage',
                            t.stringLiteral(`Expected a maximum of ${candidate.max} ${plur('value', candidate.max)}.`)
                        )),
                    ])
                )
            );
        }
        return config;
    }
    config.validators[camel] = callExpression(camel, nodeIdentifier);
    return config;
}

const candidateTypes = {
    keyword,
    data: dataString,
    string: dataString,
};

function createValidator (opts) {
    const {candidates, identifier} = opts;
    /*
     * These candidates are excluded from the automatic generation
     * of a validator because they work on the whole AST from
     * postcss-value-parser, whereas automatically generated
     * conditions tend to work on a single node instead.
     */
    if (candidates.length === 1) {
        const {value} = candidates[0];
        switch (value) {
        case 'bg-size':
        case 'repeat-style':
        case 'clip-path-property':
            return genericValidatorStub(dataValidator(value), opts);
        case 'position':
            return generatePositionValidator(opts);
        }
    }
    const settings = candidates.reduce((config, candidate) => {
        const {type} = candidate;
        if (candidateTypes[type]) {
            return candidateTypes[type](config, candidate);
        }
        return config;
    }, {
        keywords: [],
        preConditions: [],
        repeatingConditions: [],
        repeatingReturn: false,
        validators: {},
    });

    let keywords = [];

    if (settings.keywords.length) {
        const keywordList = arrayOfStrings(settings.keywords.filter(Boolean));
        /*
         * This handles the simplest case; where the grammar defines a list
         * of keywords and nothing else. In this case we can use the
         * isKeywordFactory function which saves us from having to generate
         * a validator ourselves. It produces output such as:
         *
         * const property = isKeywordFactory(['foo', 'bar', 'baz']);
         */
        if (
            !Object.keys(settings.validators).length &&
            !settings.preConditions.length &&
            !settings.repeatingConditions.length
        ) {
            const keywordFactory = 'isKeywordFactory';
            addDependency(keywordFactory);
            return [
                createConst(t.identifier(identifier), callExpression(
                    keywordFactory,
                    keywordList
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
        const keywordsList = t.identifier(`${identifier}Keywords`);
        const list = settings.keywords.length === 1 ? t.stringLiteral(settings.keywords[0]) : keywordsList;
        settings.validators.isKeyword = callExpression('isKeyword', nodeIdentifier, list);
        if (settings.keywords.length > 1) {
            keywords.push(createConst(
                keywordsList,
                keywordList
            ));
        }
    }

    const validatorKeys = Object.keys(settings.validators);

    const validatorList = validatorKeys.sort(k => k === 'isKeyword' ? -1 : 1).reduce((list, key) => {
        list.push(
            ...getValidatorResult(key, settings.validators[key])
        );
        return list;
    }, []);

    let body = [];

    if (settings.preConditions.length) {
        body = [
            ...settings.preConditions,
        ];
    }

    if (settings.repeatingConditions.length) {
        /*
         * Handle the case where the validator needs to validate *multiple*
         * values; in this case, we need to iterate over postcss-value-parser's
         * AST and check that each *even* index fulfills any of the validation
         * conditions, and that the correct separator is supplied in each
         * *odd* index.
         */
        body.unshift(createLet(
            validIdentifier,
            t.booleanLiteral(true)
        ));

        if (validatorKeys.length) {
            body.unshift(
                firstValueParserNode,
                ifAllTruthy([
                    valueParserNodesLength(1),
                ], validatorList)
            );
        }

        body.push(
            t.expressionStatement(
                t.callExpression(
                    t.memberExpression(
                        valueParserASTIdentifier,
                        t.identifier('walk')
                    ), [
                        t.arrowFunctionExpression([
                            nodeIdentifier,
                            indexIdentifier,
                        ], t.blockStatement([
                            createConst(
                                evenIdentifier,
                                callExpression('isEven', indexIdentifier)
                            ),
                            ...settings.repeatingConditions,
                            returnFalse,
                        ])
                    )]
                )
            ),
            ...settings.repeatingReturn
        );
    } else {
        /*
         * Handle the case where the validator should only need to validate
         * a *single* value; i.e, an AST yielded from postcss-value-parser
         * should only have a length of 1. If it is 1, then check that this
         * node fulfills any of the validation conditions, otherwise
         * return false.
         */
        body.push(
            firstValueParserNode,
            t.ifStatement(
                valueParserNodesLength(1, '!=='),
                t.blockStatement([
                    t.returnStatement(callExpression(
                        'invalidMessage',
                        t.stringLiteral('Expected a single value to be passed.')
                    )),
                ])
            ),
            ...validatorList,
            returnFalse
        );
    }

    return validator(identifier, keywords, body);
}

const defaultExport = template(`
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
        const result = validators[property](value);
        if (result.type) {
            return result;
        }
        if (!!result === false) {
            return invalidMessage('"' + value + '" is not a valid value for "' + property + '".');
        }
        return true;
    }
    // Pass through unknown properties
    return unknownMessage('"' + property + '" is not a recognised property.');
}
`, {preserveComments: true});

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
        t.importDeclaration([
            importMethod(t.identifier('isPositionRepeat')),
            importMethod(t.identifier('isPositionNoRepeat')),
        ], t.stringLiteral('./validators/isPosition')),
        ...funcs,
        validatorMap(config),
        createConst(
            t.identifier('cssGlobals'),
            arrayOfStrings(globals)
        ),
        defaultExport(),
    ]);
};
