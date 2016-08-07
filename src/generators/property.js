import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';
import dataValidator from '../util/dataValidator';
import template from '../util/moduleTemplate';
import * as validators from '../validators';
import exportConst from './exportConst';
import generateProgram from './program';
import requireModules from './requireModules';

const validatorPath = '../../validators/';
const isCssVar = templateExpression(`isVar(node)`);

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
    if (opts.candidates.length === 1 && opts.candidates[0].value === 'repeat-style') {
        const identifier = 'isRepeatStyle';
        return generateProgram([
            requireModules({
                identifier,
                module: `${validatorPath}${identifier}`,
            }),
            template(`export default ${identifier};`)(),
            properties,
        ]);
    }
    const settings = opts.candidates.reduce((config, candidate) => {
        if (candidate.type === 'keyword') {
            config.keywords.push(candidate.value);
        }
        if (candidate.type === 'data') {
            const camel = dataValidator(candidate.value);
            if (!validators[camel]) { // eslint-disable-line
                return config;
            }
            config.dependencies.push({
                identifier: camel,
                module: `${validatorPath}${camel}`,
            });
            const type = validators[camel].type // eslint-disable-line
            if (candidate.min === 1 && candidate.max === false && candidate.separator === ',') {
                config.dependencies.push({
                    identifier: 'isComma',
                    module: `${validatorPath}isComma`,
                });
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
                                templateExpression(`!isComma(node)`),
                            ),
                        ),
                    })
                );
                return config;
            }
            config.conditions.push(templateExpression(`${camel}(${type})`));
        }
        return config;
    }, {
        keywords: [],
        conditions: [],
        repeatingConditions: [],
        dependencies: [{
            identifier: 'isVar',
            module: `${validatorPath}isVariable`,
        }],
    });

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
            settings.conditions.push(templateExpression(`node.value.toLowerCase() === "${settings.keywords[0]}"`));
        } else {
            const isKeyword = 'isCaseInsensitiveKeyword';
            settings.dependencies.push({
                identifier: isKeyword,
                module: `${validatorPath}${isKeyword}`,
            });
            settings.conditions.push(templateExpression(`${isKeyword}(node, keywords)`));
            keywords.push(template(`const keywords = INJECT;`)({
                INJECT: arrayOfStrings(settings.keywords.filter(Boolean)),
            }));
        }
    }

    let conditions;

    if (settings.conditions.length) {
        conditions = generateOrConditions(
            generateOrConditions(...settings.conditions),
            isCssVar,
        );
    } else {
        conditions = isCssVar;
    }

    const tmpl = template(`
    export default function (parsed) {
        if (parsed.nodes.length === 1) {
            const node = parsed.nodes[0];
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
