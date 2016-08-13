import template from '../util/moduleTemplate';
import globals from '../util/globals';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    export default function cssValues (property, value) {
        if (typeof value === 'string') {
            value = valueParser(value);
        }
        const first = value.nodes[0];
        if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVariable(first))) {
            return true;
        }
        return validators.some(validator => {
            if (!~validator.properties.indexOf(property)) {
                return;
            }
            return validator.fn(value);
        });
    }
    `);

    return generateProgram([
        requireModules({
            identifier: 'isKeyword',
            module: './validators/isKeyword',
        }, {
            identifier: 'isVariable',
            module: './validators/isVariable',
        }, {
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
