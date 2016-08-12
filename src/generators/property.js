import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';
import dataValidator from '../util/dataValidator';
import template from '../util/moduleTemplate';
import * as validators from '../validators';
import exportConst from './exportConst';
import generateProgram from './program';
import requireModules from './requireModules';

const validatorPath = '../../validators/';

function getValidator (identifier) {
    return {
        identifier,
        module: `${validatorPath}${identifier}`,
    };
}

function generateConditionsFactory (operator) {
    return function generateConditions (...conditions) {
        if (conditions.length === 1) {
            return conditions[0];
        }
        return t.logicalExpression(
            operator,
            generateConditions(...conditions.slice(0, conditions.length - 1)),
            conditions[conditions.length - 1]
        );
    };
}

const generateConditions = generateConditionsFactory('&&');
const generateOrConditions = generateConditionsFactory('||');

function templateExpression (tmpl, opts = {}) {
    return template(tmpl)(opts).expression;
}

function handleKeywords (keywords, settings) {
    if (!settings.keywords.length) {
        return;
    }
    if (settings.keywords.length === 1) {
        settings.conditions.push(templateExpression(`node.value.toLowerCase() === "${settings.keywords[0]}"`));
    } else {
        const isKeyword = 'isKeyword';
        settings.dependencies.push(getValidator(isKeyword));
        settings.conditions.push(templateExpression(`${isKeyword}(node, keywords)`));
        keywords.push(template(`const keywords = INJECT;`)({
            INJECT: arrayOfStrings(settings.keywords.filter(Boolean)),
        }));
    }
}

export default opts => {
    const properties = exportConst({
        identifier: 'properties',
        exported: arrayOfStrings(opts.properties),
    });
    if (opts.candidates.length === 1 && opts.candidates[0].value === 'position') {
        const identifier = 'isPosition';
        let main = template(`export default isPosition();`)();
        if (opts.candidates[0].separator === ',') {
            main = template(`export default isPosition(true);`)();
        }
        return generateProgram([
            requireModules(getValidator(identifier)),
            main,
            properties,
        ]);
    }
    if (opts.candidates.length === 1 && opts.candidates[0].value === 'repeat-style') {
        const identifier = 'isRepeatStyle';
        return generateProgram([
            requireModules(getValidator(identifier)),
            template(`export default ${identifier};`)(),
            properties,
        ]);
    }
    const settings = opts.candidates.reduce((config, candidate) => {
        if (candidate.type === 'keyword') {
            config.keywords.push(candidate.value);
        }
        if (candidate.type === 'data' || candidate.type === 'string') {
            const camel = candidate.type === 'string' ? 'isString' : dataValidator(candidate.value);
            if (!validators[camel]) { // eslint-disable-line
                return config;
            }
            config.dependencies.push(getValidator(camel));
            if (candidate.value === 'position') {
                config.preConditions.push(
                    template(`if (isPosition(true)(parsed)) { return true; }`)()
                );
                return config;
            }
            const type = validators[camel].type // eslint-disable-line
            if (candidate.min === 1) {
                let separator;
                if (candidate.separator === ',') {
                    separator = `!isComma(node)`;
                    config.dependencies.push(getValidator('isComma'));
                } else {
                    separator = `!isSpace(node)`;
                    config.dependencies.push(getValidator('isSpace'));
                }

                config.repeatingConditions.push(
                    template(`if (cons) { valid = false; }`)({
                        cons: generateOrConditions(
                            generateConditions(
                                templateExpression(`even`),
                                generateConditions(
                                    templateExpression(`!${camel}(${type})`),
                                    templateExpression('!isVar(node)'),
                                ),
                            ),
                            generateConditions(
                                templateExpression(`!even`),
                                templateExpression(separator),
                            ),
                        ),
                    })
                );
                const tmpl = `return valid && parsed.nodes.length % 2 !== 0`;
                if (candidate.max !== false) {
                    config.repeatingReturn = template(`${tmpl} && parsed.nodes.length <= ${(candidate.max * 2) - 1};`)();
                } else {
                    config.repeatingReturn = template(`${tmpl};`)();
                }

                return config;
            }
            config.conditions.push(templateExpression(`${camel}(${type})`));
        }
        return config;
    }, {
        keywords: [],
        conditions: [],
        preConditions: [],
        repeatingConditions: [],
        dependencies: [{
            identifier: 'isVar',
            module: `${validatorPath}isVariable`,
        }],
        repeatingReturn: false,
    });

    let keywords = [];

    if (settings.repeatingConditions.length) {
        handleKeywords(keywords, settings);

        const tmpl = template(`
        export default function (parsed) {
            PREVALID
            let valid = true;
            PRECONDITIONS
            parsed.walk((node, index) => {
                const even = index % 2 === 0;
                CONDITIONS
                return false;
            });
            POSTCONDITIONS
        }
        `)({
            PRECONDITIONS: settings.preConditions,
            CONDITIONS: settings.repeatingConditions,
            POSTCONDITIONS: settings.repeatingReturn,
            PREVALID: settings.conditions.length ?
                template(`const node = parsed.nodes[0]; if (parsed.nodes.length === 1 && CONDITIONS) { return true; }`)({
                    CONDITIONS: settings.conditions,
                }) :
                t.emptyStatement(),
        });

        return generateProgram([
            requireModules(...settings.dependencies),
            ...keywords,
            tmpl,
            properties,
        ]);
    }

    if (settings.keywords.length) {
        if (!settings.conditions.length && !settings.preConditions.length) {
            const identifier = 'isKeywordFactory';
            settings.dependencies.push(getValidator(identifier));
            return generateProgram([
                requireModules(...settings.dependencies),
                template(`export default ${identifier}(keywords);`)({
                    keywords: arrayOfStrings(settings.keywords.filter(Boolean)),
                }),
                properties,
            ]);
        }
        handleKeywords(keywords, settings);
    }

    let conditions;

    if (settings.conditions.length) {
        conditions = generateOrConditions(...settings.conditions);
    } else {
        conditions = t.booleanLiteral(true);
    }

    const tmpl = template(`
    export default function (parsed) {
        PRECONDITIONS
        if (parsed.nodes.length === 1) {
            const node = parsed.nodes[0];
            return CONDITIONS
        }
        return false;
    }
    `)({
        PRECONDITIONS: settings.preConditions,
        CONDITIONS: conditions,
    });

    return generateProgram([
        requireModules(...settings.dependencies),
        ...keywords,
        tmpl,
        properties,
    ]);
};
