import template from '../util/moduleTemplate';
import globals from '../util/globals';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    export default function isValid (cssString) {
        const parts = cssString.split(':').map(value => value.trim());
        const parsed = valueParser(parts[1]);
        if (parsed.nodes.length === 1 && ~cssGlobals.indexOf(parsed.nodes[0].value.toLowerCase())) {
            return true;
        }
        return validators.some(validator => {
            if (!~validator.properties.indexOf(parts[0])) {
                return;
            }
            return validator.default(parsed);
        });
    }
    `);

    return generateProgram([
        requireModules({
            identifier: 'validators',
            module: './properties/index',
        }, {
            identifier: 'valueParser',
            module: 'postcss-value-parser',
        }),
        template(`const cssGlobals = INJECT;`)({
            INJECT: arrayOfStrings(globals),
        }),
        tmpl(),
    ]);
};
