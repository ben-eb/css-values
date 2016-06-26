import template from 'babel-template';
import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';
import capitalise from '../util/capitalise';
import singleValue from '../util/singleValue';
import generateProgram from './program';
import requireModules from './requireModules';

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

function getValues (candidates) {
    return candidates.reduce((list, candidate) => {
        if (candidate.type === 'keyword') {
            list.push(candidate.value);
        }
        return list;
    }, []);
}

function handleSingle (opts) {
    const tmpl = template(`
    module.exports = function (parsed) {
        if (parsed.nodes.length === 1) {
            var node  = parsed.nodes[0];
            var type  = node.type;
            var value = node.value;
            return CONDITIONS;
        }
        return false;
    }
    `);

    let config = {STRING: null};

    const properties = template(`module.exports.properties = EXPORTS;`)({
        EXPORTS: arrayOfStrings(opts.properties)
    });

    const conditions = [];
    const dependencies = [];
    let keywords = null;

    const values = getValues(opts.candidates);

    if (values && values.length) {
        if (values.length === 1) {
            conditions.push(templateExpression(`value === "${values[0]}"`));
        } else {
            conditions.push(templateExpression(`~_pos0.indexOf(value)`));
            keywords = template(`var _pos0 = INJECT;`)({
                INJECT: arrayOfStrings(values.filter(Boolean))
            });
        }
    }

    const dataValues = opts.candidates.filter(c => c.type === 'data');
    dataValues.forEach(({value}) => {
        const camel = `is${capitalise(value)}`;
        conditions.push(templateExpression(`${camel}(value)`));
        dependencies.push({
            identifier: camel,
            module: `../../validators/${camel}`
        });
    });

    if (opts.candidates.filter(c => c.type === 'string').length) {
        config.STRING = templateExpression(`type === 'string'`);
    }

    if (conditions.length) {
        config.CONDITIONS = generateOrConditions(...[
            templateExpression(`type === 'word' && CONDITIONS`, {
                CONDITIONS: generateOrConditions(...conditions)
            }),
            templateExpression(`type === 'function' && value === 'var'`),
            config.STRING
        ].filter(Boolean));
    }

    if (keywords) {
        return generateProgram([
            requireModules(...dependencies),
            [keywords],
            tmpl(config),
            properties
        ]);
    }

    return generateProgram([
        requireModules(...dependencies),
        tmpl(config),
        properties
    ]);
}

export default opts => {
    if (singleValue(opts.candidates)) {
        return handleSingle(opts);
    }
    const tmpl = template(`
    module.exports = function (parsed) {
        var valid = true;
        var count = 0;

        parsed.walk(function (node) {
            WORD
            STRING
            SEPARATOR
        });

        return count > COUNT ? false : valid;
    }
    `);

    const properties = template(`module.exports.properties = EXPORTS;`)({
        EXPORTS: arrayOfStrings(opts.properties)
    });

    let config = ['SEPARATOR', 'STRING', 'WORD'].reduce((list, key) => {
        list[key] = t.emptyStatement();
        return list;
    }, {});

    config.COUNT = t.numericLiteral(opts.count);

    let conditions = [];
    let dependencies = [];
    let keywords = null;

    const values = getValues(opts.candidates);

    if (values && values.length) {
        if (values.length === 1) {
            conditions.push(templateExpression(`node.value !== "${values[0]}"`));
        } else {
            conditions.push(templateExpression(`!~_pos0.indexOf(node.value)`));
            keywords = template(`var _pos0 = INJECT;`)({
                INJECT: arrayOfStrings(values.filter(Boolean))
            });
        }
    }

    const dataValues = opts.candidates.filter(c => c.type === 'data');
    dataValues.forEach(({value}) => {
        const camel = `is${capitalise(value)}`;
        conditions.push(templateExpression(`!${camel}(node.value)`));
        dependencies.push({
            identifier: camel,
            module: `../../validators/${camel}`
        });
    });

    if (conditions.length) {
        config.WORD = template(`if (node.type === 'word') { inject; count++; }`)({
            inject: template('if (inject) { valid = false; return false; }')({
                inject: generateConditions(...conditions)
            })
        });
    }

    if (opts.string) {
        config.STRING = template(`if (node.type === 'string') { count++; }`)();
    }

    if (opts.repeat && opts.repeat.separator) {
        config.SEPARATOR = template(`if (node.type === 'div' && node.value === "${opts.repeat.separator}") { count --; }`)();
    }

    if (keywords) {
        return generateProgram([
            requireModules(...dependencies),
            [keywords],
            tmpl(config),
            properties
        ]);
    }

    return generateProgram([
        requireModules(...dependencies),
        tmpl(config),
        properties
    ]);
};
