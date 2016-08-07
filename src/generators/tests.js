import template from '../util/moduleTemplate';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    suites.forEach(suite => {
        suite.forEach(({property, value, valid}) => {
            test(property + ': ' + value, t => {
                t.deepEqual(cssValues(property, value), valid);
            });
        });
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
