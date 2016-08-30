import * as t from 'babel-types';
import * as validators from '../validators';
import arrayOfStrings from '../util/arrayOfStrings';
import {ifAllTruthy, ifAnyTruthy, anyTruthy, allTruthy} from '../util/conditionals';
import {createConst, createLet} from '../util/createVariable';
import dataValidator from '../util/dataValidator';
import globals from '../util/globals';
import template from '../util/moduleTemplate';
import templateExpression from '../util/templateExpression';
import generateProgram from './program';
import requireModules from './requireModules';
import validator, {generateValidatorStub} from './validator';

const parsedNodes = t.memberExpression(
    t.identifier('parsed'),
    t.identifier('nodes')
);

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

function generatePositionValidator ({candidates, identifier, properties}) {
    const func = 'isPosition';
    addDependency(func);
    return generateValidatorStub(identifier, properties, t.callExpression(
        t.identifier(func),
        [t.booleanLiteral(candidates[0].separator === ',')]
    ));
}

function genericValidatorStub (name, {identifier, properties}) {
    addDependency(name);
    return generateValidatorStub(identifier, properties, t.identifier(name));
}

function createValidator (opts) {
    if (opts.candidates.length === 1) {
        switch (opts.candidates[0].value) {
        case 'bg-size':
            return genericValidatorStub('isBgSize', opts);
        case 'position':
            return generatePositionValidator(opts);
        case 'repeat-style':
            return genericValidatorStub('isRepeatStyle', opts);
        }
    }
    const settings = opts.candidates.reduce((config, candidate) => {
        if (candidate.type === 'keyword') {
            config.keywords.push(candidate.value);
        }
        if (candidate.type === 'data' || candidate.type === 'string') {
            const camel = candidate.type === 'string' ? 'isString' : dataValidator(candidate.value);
            if (!validators[camel]) {
                return config;
            }
            addDependency(camel);
            if (camel === 'isPosition') {
                config.preConditions.push(
                    template(`if (${camel}(true)(parsed)) { return true; }`)()
                );
                return config;
            }
            if (camel === 'isTransformList' || camel === 'isShadowT' || camel === 'isFilterFunctionList') {
                config.preConditions.push(
                    template(`if (${camel}(parsed)) { return true; }`)()
                );
                return config;
            }
            if (candidate.min === 1) {
                let separator;
                if (candidate.separator === ',') {
                    separator = `!isComma(node)`;
                    addDependency('isComma');
                } else {
                    separator = `!isSpace(node)`;
                    addDependency('isSpace');
                }

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
                const tmpl = `return valid && parsed.nodes.length % 2 !== 0`;
                if (candidate.max !== false) {
                    config.repeatingReturn = template(`${tmpl} && parsed.nodes.length <= ${(candidate.max * 2) - 1};`)();
                } else {
                    config.repeatingReturn = template(`${tmpl};`)();
                }

                return config;
            }
            config.conditions.push(templateExpression(`${camel}(node)`));
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
            createConst(
                t.identifier('node'),
                t.memberExpression(
                    parsedNodes,
                    t.numericLiteral(0),
                    true
                )
            ),
            ifAllTruthy([
                t.binaryExpression(
                    '===',
                    t.memberExpression(
                        parsedNodes,
                        t.identifier('length')
                    ),
                    t.numericLiteral(1)
                ),
                ...settings.conditions,
            ], [
                t.returnStatement(t.booleanLiteral(true)),
            ]),
        ] : [t.emptyStatement()];

        return [
            ...keywords,
            validator(opts.identifier, opts.properties, [
                ...prevalid,
                createLet(
                    t.identifier('valid'),
                    t.booleanLiteral(true)
                ),
                template('PRECONDITIONS')({
                    PRECONDITIONS: settings.preConditions.length ? settings.preConditions : t.emptyStatement(),
                }),
                template('parsed.walk((node, index) => { const even = index % 2 === 0; CONDITIONS; return false; });')({
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
                generateValidatorStub(opts.identifier, opts.properties, t.callExpression(
                    t.identifier(identifier),
                    [arrayOfStrings(settings.keywords.filter(Boolean))]
                )),
            ];
        }
        handleKeywords(keywords, settings, opts.identifier);
    }

    let block;

    if (settings.conditions.length) {
        block = [
            createConst(
                t.identifier('node'),
                t.memberExpression(
                    parsedNodes,
                    t.numericLiteral(0),
                    true
                )
            ),
            t.returnStatement(anyTruthy(...settings.conditions)),
        ];
    } else {
        block = [
            t.returnStatement(t.booleanLiteral(true)),
        ];
    }

    return [
        ...keywords,
        validator(opts.identifier, opts.properties, [
            ...(settings.preConditions.length ? settings.preConditions : t.emptyStatement()),
            t.ifStatement(
                t.binaryExpression(
                    '===',
                    t.memberExpression(
                        parsedNodes,
                        t.identifier('length')
                    ),
                    t.numericLiteral(1)
                ),
                t.blockStatement(block)
            ),
            t.returnStatement(t.booleanLiteral(false)),
        ]),
    ];
}

function generateValidatorsList (config) {
    return t.arrayExpression(config.map(({identifier}) => {
        return t.identifier(identifier);
    }));
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
        ...funcs,
        createConst(
            t.identifier('validators'),
            generateValidatorsList(config)
        ),
        createConst(
            t.identifier('cssGlobals'),
            arrayOfStrings(globals)
        ),
        template(`
            export default function cssValues (property, value) {
                if (typeof value === 'string') {
                    value = valueParser(value);
                }
                const first = value.nodes[0];
                if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVariable(first))) {
                    return true;
                }
                return validators.some(validator => {
                    if (!~validator.properties.indexOf(property)) {
                        return;
                    }
                    return validator.fn(value);
                });
            }
        `)(),
    ]);
};
