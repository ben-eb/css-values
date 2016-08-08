import template from '../util/moduleTemplate';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    function macro (t, property, value, valid) {
        t.is(cssValues(property, value), valid);
    }

    macro.title = (title, property, value, valid) => {
        return property + ': ' + value + ' (' + (valid ? 'valid' : 'invalid') + ')';
    };

    suites.forEach(suite => {
        suite.forEach(({property, value, valid}) => test(macro, property, value, valid));
    });
    `);

    return generateProgram([
        requireModules({
            identifier: 'test',
            module: `ava`,
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
