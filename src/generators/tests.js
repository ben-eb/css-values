import template from '../util/moduleTemplate';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    function macro (t, property, value, valid) {
        t.is(cssValues(property, value), valid);
    }

    macro.title = (title, property, value, valid) => {
        const validStr = ' (' + (valid ? 'valid' : 'invalid') + ')';
        if (typeof value === 'string') {
            return property + ': ' + value + validStr;
        }
        return '[parsed nodes]' + validStr;
    };

    suites.forEach(suite => {
        suite.forEach(({property, value, valid}) => test(macro, property, value, valid));
    });

    test('should accept an ast', macro, 'color', valueParser('blue'), true);
    `);

    return generateProgram([
        requireModules({
            identifier: 'test',
            module: `ava`,
        }, {
            identifier: 'valueParser',
            module: `postcss-value-parser`,
        }, {
            identifier: 'cssValues',
            module: `./index`,
        }, {
            identifier: 'suites',
            module: `./tests`,
        }),
        tmpl(),
    ]);
};
