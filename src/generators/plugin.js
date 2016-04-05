import template from 'babel-template';
import * as t from 'babel-types';
import generateProgram from './program';
import requireModules from './requireModules';
import globals from '../util/globals';
import toStringLiteral from '../util/toStringLiteral';

export default () => {
    const tmpl = template(`
    module.exports = function isValid (cssString) {
        var parts = cssString.split(':').map(function (value) {
            return value.trim();
        });
        var parsed = valueParser(parts[1]);
        if (parsed.nodes.length === 1 && ~GLOBALS.indexOf(parsed.nodes[0].value)) {
            return true;
        }
        var invalid = validators.some(function (validator) {
            if (!~validator.properties.indexOf(parts[0])) {
                return;
            }
            return !validator(parsed);
        });
        return !invalid;
    }
    `);

    return generateProgram([
        requireModules({
            identifier: 'validators',
            module: './properties/'
        }, {
            identifier: 'valueParser',
            module: 'postcss-value-parser'
        }),
        tmpl({
            GLOBALS: t.arrayExpression(globals.map(toStringLiteral))
        })
    ]);
};
