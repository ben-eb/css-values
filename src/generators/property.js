import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';
import {ifAllTruthy, ifAnyTruthy, anyTruthy, allTruthy} from '../util/conditionals';
import {createConst, createLet} from '../util/createVariable';
import dataValidator from '../util/dataValidator';
import template from '../util/moduleTemplate';
import templateExpression from '../util/templateExpression';
import * as validators from '../validators';
import generateProgram from './program';
import requireModules from './requireModules';
import validator, {generateValidatorStub} from './validator';

const parsedNodes = t.memberExpression(
    t.identifier('parsed'),
    t.identifier('nodes')
);

function getValidator (identifier) {
    return {
        identifier,
        module: `../../validators/${identifier}`,
    };
}

function handleKeywords (keywords, settings) {
    if (!settings.keywords.length) {
        return;
    }
    const isKeyword = 'isKeyword';
    settings.dependencies.push(getValidator(isKeyword));
    if (settings.keywords.length === 1) {
        settings.conditions.push(templateExpression(`${isKeyword}(node, "${settings.keywords[0]}")`));
    } else {
        settings.conditions.push(templateExpression(`${isKeyword}(node, keywords)`));
        keywords.push(createConst(
            t.identifier('keywords'),
            arrayOfStrings(settings.keywords.filter(Boolean))
        ));
    }
}

function generatePositionValidator ({candidates, identifier, properties}) {
    const func = 'isPosition';
    return generateProgram([
        requireModules(getValidator(func)),
        generateValidatorStub(identifier, properties, t.callExpression(
            t.identifier(func),
            [t.booleanLiteral(candidates[0].separator === ',')]
        )),
    ]);
}

function generateRepeatValidator ({identifier, properties}) {
    const func = 'isRepeatStyle';
    return generateProgram([
        requireModules(getValidator(func)),
        generateValidatorStub(identifier, properties, t.identifier(func)),
    ]);
}

export default opts => {
    if (opts.candidates.length === 1) {
        switch (opts.candidates[0].value) {
        case 'position':
            return generatePositionValidator(opts);
        case 'repeat-style':
            return generateRepeatValidator(opts);
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
            config.dependencies.push(getValidator(camel));
            if (camel === 'isPosition') {
                config.preConditions.push(
                    template(`if (${camel}(true)(parsed)) { return true; }`)()
                );
                return config;
            }
            if (camel === 'isFilterFunctionList') {
                config.preConditions.push(
                    template(`if (${camel}(parsed)) { return true; }`)()
                );
                return config;
            }
            if (candidate.min === 1) {
                let separator;
                if (candidate.separator === ',') {
                    separator = `!isComma(node)`;
                    config.dependencies.push(getValidator('isComma'));
                } else {
                    separator = `!isSpace(node)`;
                    config.dependencies.push(getValidator('isSpace'));
                }

                config.dependencies.push(getValidator('isVariable'));

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
        dependencies: [],
        repeatingReturn: false,
    });

    let keywords = [];

    if (settings.repeatingConditions.length) {
        handleKeywords(keywords, settings);

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

        return generateProgram([
            requireModules(...settings.dependencies),
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
        ]);
    }

    if (settings.keywords.length) {
        if (!settings.conditions.length && !settings.preConditions.length) {
            const identifier = 'isKeywordFactory';
            settings.dependencies.push(getValidator(identifier));
            return generateProgram([
                requireModules(...settings.dependencies),
                generateValidatorStub(opts.identifier, opts.properties, t.callExpression(
                    t.identifier(identifier),
                    [arrayOfStrings(settings.keywords.filter(Boolean))]
                )),
            ]);
        }
        handleKeywords(keywords, settings);
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

    return generateProgram([
        requireModules(...settings.dependencies),
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
    ]);
};
