import * as t from 'babel-types';
import camelCase from 'camelcase';
import arrayOfStrings from '../util/arrayOfStrings';
import capitalise from '../util/capitalise';
import template from '../util/moduleTemplate';
import validators from '../validators';
import exportConst from './exportConst';
import generateProgram from './program';
import requireModules from './requireModules';

const isCssVar = templateExpression(`type === 'function' && value === 'var'`);

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

export default opts => {
    const properties = exportConst({
        identifier: 'properties',
        exported: arrayOfStrings(opts.properties),
    });
    const settings = opts.candidates.reduce((config, candidate) => {
        if (candidate.type === 'keyword') {
            config.keywords.push(candidate.value);
        }
        if (candidate.type === 'data') {
            const camel = `is${capitalise(camelCase(candidate.value))}`;
            if (!~validators.indexOf(camel)) {
                return config;
            }
            config.dependencies.push({
                identifier: camel,
                module: `../../validators/${camel}`,
            });
            if (candidate.min === 1 && candidate.max === false && candidate.separator === ',') {
                config.repeatingConditions.push(
                    template(`if (cons) { valid = false; }`)({
                        cons: generateOrConditions(
                            generateConditions(
                                templateExpression(`even`),
                                generateOrConditions(
                                    generateConditions(
                                        templateExpression(`node.type === 'word'`),
                                        templateExpression(`!${camel}(node.value)`),
                                    ),
                                    generateConditions(
                                        templateExpression(`node.type === 'function'`),
                                        templateExpression(`node.value !== 'var'`),
                                    ),
                                ),
                            ),
                            generateConditions(
                                templateExpression(`!even`),
                                templateExpression(`node.type === 'div'`),
                                templateExpression(`node.value !== ','`),
                            ),
                        ),
                    })
                );
                return config;
            }
            config.conditions.push(templateExpression(`${camel}(value)`));
        }
        return config;
    }, {keywords: [], conditions: [], repeatingConditions: [], dependencies: []});

    if (settings.repeatingConditions.length) {
        const tmpl = template(`
        export default function (parsed) {
            let valid = true;
            parsed.walk((node, index) => {
                const even = index % 2 === 0;
                CONDITIONS
                return false;
            });
            return valid && parsed.nodes.length % 2 !== 0;
        }
        `)({
            CONDITIONS: settings.repeatingConditions,
        });

        return generateProgram([
            requireModules(...settings.dependencies),
            tmpl,
            properties,
        ]);
    }

    let keywords = [];

    if (settings.keywords.length) {
        if (settings.keywords.length === 1) {
            settings.conditions.push(templateExpression(`value === "${settings.keywords[0]}"`));
        } else {
            settings.conditions.push(templateExpression(`~keywords.indexOf(value)`));
            keywords.push(template(`const keywords = INJECT;`)({
                INJECT: arrayOfStrings(settings.keywords.filter(Boolean)),
            }));
        }
    }

    let conditions;

    if (settings.conditions.length) {
        conditions = generateOrConditions(
            templateExpression(`type === 'word' && CONDITIONS`, {
                CONDITIONS: generateOrConditions(...settings.conditions),
            }),
            isCssVar,
        );
    } else {
        conditions = isCssVar;
    }

    const tmpl = template(`
    export default function (parsed) {
        if (parsed.nodes.length === 1) {
            const {type, value} = parsed.nodes[0];
            return CONDITIONS
        }
        return false;
    }
    `)({
        CONDITIONS: conditions,
    });

    return generateProgram([
        requireModules(...settings.dependencies),
        ...keywords,
        tmpl,
        properties,
    ]);
};
