import template from '../util/moduleTemplate';
import globals from '../util/globals';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    export default function cssValues (property, value) {
        let parsed;
        if (typeof value === 'string') {
            parsed = valueParser(value);
        }
        if (parsed.nodes.length === 1 && ~cssGlobals.indexOf(parsed.nodes[0].value.toLowerCase())) {
            return true;
        }
        return validators.some(validator => {
            if (!~validator.properties.indexOf(property)) {
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
