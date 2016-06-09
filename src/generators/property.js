import template from 'babel-template';
import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

let generateConditions = (...conditions) => {
    if (conditions.length === 1) {
        return conditions[0];
    }
    return t.logicalExpression(
        '&&',
        generateConditions(...conditions.slice(0, conditions.length - 1)),
        conditions[conditions.length - 1]
    );
};

export default opts => {
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

    if (opts.values && opts.values.length) {
        if (opts.values.length === 1) {
            conditions.push(template(`node.value !== "${opts.values[0]}"`)().expression);
        } else {
            conditions.push(template(`!~keywords.indexOf(node.value)`)().expression);
            keywords = template(`var keywords = INJECT;`)({
                INJECT: arrayOfStrings(opts.values)
            });
        }
    }

    ['length', 'integer', 'percentage', 'number', 'time'].forEach(type => {
        if (!opts[type]) {
            return;
        }
        const camel = 'is' + type[0].toUpperCase() + type.slice(1, type.length);
        conditions.push(template(`!${camel}(node.value)`)().expression);
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
