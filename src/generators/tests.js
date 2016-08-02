import template from '../util/moduleTemplate';
import generateProgram from './program';
import requireModules from './requireModules';

export default () => {
    const tmpl = template(`
    suites.forEach(function (suite) {
        suite.forEach(function (test) {
            ava(test.fixture, function (t) {
                t.deepEqual(plugin(test.fixture), test.valid);
            });
        });
    });
    `);

    return generateProgram([
        requireModules({
            identifier: 'ava',
            module: `ava`,
        }, {
            identifier: 'plugin',
            module: `./plugin`,
        }, {
            identifier: 'suites',
            module: `./tests`,
        }),
        tmpl(),
    ]);
};
