import template from 'babel-template';
import globals from '../util/globals';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    module.exports = function isValid (cssString) {
        var parts = cssString.split(':').map(function (value) {
            return value.trim();
        });
        var parsed = valueParser(parts[1]);
        if (parsed.nodes.length === 1 && ~globals.indexOf(parsed.nodes[0].value)) {
            return true;
        }
        return validators.some(function (validator) {
            if (!~validator.properties.indexOf(parts[0])) {
                return;
            }
            return validator(parsed);
        });
    }
    `);

    return generateProgram([
        requireModules({
            identifier: 'validators',
            module: './properties/',
        }, {
            identifier: 'valueParser',
            module: 'postcss-value-parser',
        }),
        template(`var globals = INJECT;`)({
            INJECT: arrayOfStrings(globals),
        }),
        tmpl(),
    ]);
};
