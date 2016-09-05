import * as t from 'babel-types';
import * as validators from '../validators';
import arrayOfStrings from '../util/arrayOfStrings';
import {ifAllTruthy, ifAnyTruthy, anyTruthy, allTruthy} from '../util/conditionals';
import {createConst, createLet} from '../util/createVariable';
import dataValidator from '../util/dataValidator';
import globals from '../util/globals';
import importMethod from '../util/importMethod';
import template from '../util/moduleTemplate';
import templateExpression from '../util/templateExpression';
import generateProgram from './program';
import requireModules from './requireModules';
import validator from './validator';

const valueParserASTNodes = t.memberExpression(
    t.identifier('valueParserAST'),
    t.identifier('nodes')
);

const firstValueParserNode = createConst(
    t.identifier('node'),
    t.memberExpression(
        valueParserASTNodes,
        t.numericLiteral(0),
        true
    )
);

const returnTrue = t.returnStatement(t.booleanLiteral(true));
const returnFalse = t.returnStatement(t.booleanLiteral(false));

function handleKeywords (keywords, settings, id) {
    if (!settings.keywords.length) {
        return;
    }
    const isKeyword = 'isKeyword';
    if (settings.keywords.length === 1) {
        settings.conditions.push(templateExpression(`${isKeyword}(node, "${settings.keywords[0]}")`));
    } else {
        settings.conditions.push(templateExpression(`${isKeyword}(node, ${id}Keywords)`));
        keywords.push(createConst(
            t.identifier(`${id}Keywords`),
            arrayOfStrings(settings.keywords.filter(Boolean))
        ));
    }
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
    return createConst(t.identifier(identifier), t.callExpression(
        t.identifier(func),
        [t.booleanLiteral(candidates[0].separator === ',')]
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
        const separator = `!${method}(node)`;
        addDependency(method);
        addDependency('isEven');
        config.repeatingConditions.push(
            ifAnyTruthy([
                allTruthy(
                    templateExpression(`even`),
                    allTruthy(
                        templateExpression(`!${camel}(node)`),
                        templateExpression('!isVariable(node)'),
                    ),
                ),
                allTruthy(
                    templateExpression(`!even`),
                    templateExpression(separator),
                ),
            ], [
                t.expressionStatement(
                    t.assignmentExpression(
                        '=',
                        t.identifier('valid'),
                        t.booleanLiteral(false)
                    ),
                ),
            ])
        );
        const tmpl = `return valid && !isEven(valueParserAST.nodes.length)`;
        if (candidate.max !== false) {
            config.repeatingReturn = template(`${tmpl} && valueParserAST.nodes.length <= ${(candidate.max * 2) - 1};`)();
        } else {
            config.repeatingReturn = template(`${tmpl};`)();
        }

        return config;
    }
    config.conditions.push(templateExpression(`${camel}(node)`));
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

    if (settings.repeatingConditions.length) {
        handleKeywords(keywords, settings, opts.identifier);

        const prevalid = settings.conditions.length ? [
            firstValueParserNode,
            ifAllTruthy([
                t.binaryExpression(
                    '===',
                    t.memberExpression(
                        valueParserASTNodes,
                        t.identifier('length')
                    ),
                    t.numericLiteral(1)
                ),
                ...settings.conditions,
            ], [
                returnTrue,
            ]),
        ] : [t.emptyStatement()];

        addDependency('isEven');

        return [
            ...keywords,
            validator(opts.identifier, [
                ...prevalid,
                createLet(
                    t.identifier('valid'),
                    t.booleanLiteral(true)
                ),
                template('PRECONDITIONS')({
                    PRECONDITIONS: settings.preConditions.length ? settings.preConditions : t.emptyStatement(),
                }),
                template('valueParserAST.walk((node, index) => { const even = isEven(index); CONDITIONS; return false; });')({
                    CONDITIONS: settings.repeatingConditions.length ? settings.repeatingConditions : t.emptyStatement(),
                }),
                template('POSTCONDITIONS')({
                    POSTCONDITIONS: settings.repeatingReturn ? settings.repeatingReturn : t.emptyStatement(),
                }),
            ]),
        ];
    }

    if (settings.keywords.length) {
        if (!settings.conditions.length && !settings.preConditions.length) {
            const identifier = 'isKeywordFactory';
            addDependency(identifier);
            return [
                createConst(t.identifier(opts.identifier), t.callExpression(
                    t.identifier(identifier),
                    [arrayOfStrings(settings.keywords.filter(Boolean))]
                )),
            ];
        }
        handleKeywords(keywords, settings, opts.identifier);
    }

    const block = settings.conditions.length ? [
        firstValueParserNode,
        t.returnStatement(anyTruthy(...settings.conditions)),
    ] : [
        returnTrue,
    ];

    return [
        ...keywords,
        validator(opts.identifier, [
            ...(settings.preConditions.length ? settings.preConditions : t.emptyStatement()),
            t.ifStatement(
                t.binaryExpression(
                    '===',
                    t.memberExpression(
                        valueParserASTNodes,
                        t.identifier('length')
                    ),
                    t.numericLiteral(1)
                ),
                t.blockStatement(block)
            ),
            returnFalse,
        ]),
    ];
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
