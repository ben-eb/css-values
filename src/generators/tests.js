import template from '../util/moduleTemplate';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
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
            identifier: 'suites',
            module: `./tests`,
        }, {
            identifier: 'macro',
            module: './util/testMacro',
        }),
        tmpl(),
    ]);
};
