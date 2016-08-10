import * as t from 'babel-types';
import camelCase from 'camelcase';
import arrayOfStrings from '../util/arrayOfStrings';
import template from '../util/moduleTemplate';
import * as fixtures from '../fixtures/index';
import generateProgram from './program';
import requireModules from './requireModules';

function createTest (fixture, valid = true) {
    return t.objectExpression([
        t.objectProperty(
            t.identifier('property'),
            t.identifier('property'),
        ),
        t.objectProperty(
            t.identifier('value'),
            t.stringLiteral(fixture)
        ),
        t.objectProperty(
            t.identifier('valid'),
            t.identifier(valid ? 'true' : 'false')
        ),
    ]);
}

export default opts => {
    const tests = opts.candidates.reduce((list, candidate) => {
        const {type, value} = candidate;
        if (type === 'keyword') {
            list.push(t.spreadElement(
                t.callExpression(
                    t.identifier('createCaseInsensitiveTest'), [
                        t.identifier('property'),
                        t.stringLiteral(value),
                    ]
                )
            ), createTest(`${value} ${value}`, false));
        }
        if (type === 'data') {
            const camel = camelCase(value);
            if (fixtures[camel]) { // eslint-disable-line
                const values = fixtures[camel]; // eslint-disable-line
                list.push.apply(list, values.valid.map(fixture => {
                    return createTest(fixture);
                }));
                list.push.apply(list, values.invalid.map(fixture => {
                    return createTest(fixture, false);
                }));
                list.push(createTest(`${values.valid[0]} ${values.valid[0]}`, false));
                if (candidate.min === 1 && candidate.max === false && candidate.separator === ',') {
                    list.push(
                        createTest(`${values.valid[0]}, ${values.valid[0]}`),
                        createTest(`${values.valid[0]}, ${values.valid[0]},`, false),
                        createTest(`var(--foo), var(--bar)`),
                        createTest(`var(--foo), var(--bar),`, false)
                    );
                }
            }
        }
        return list;
    }, [t.spreadElement(
        t.callExpression(
            t.identifier('globalTests'), [
                t.identifier('property'),
            ]
        )
    )]);
    const dependencies = requireModules({
        identifier: 'globalTests',
        module: `../../util/globalTests.js`,
    }, {
        identifier: 'createCaseInsensitiveTest',
        module: `../../util/createCaseInsensitiveTest`,
    });
    if (opts.properties.length === 1) {
        return generateProgram([
            dependencies,
            template(`const property = PROPERTY;`)({
                PROPERTY: t.stringLiteral(opts.properties[0]),
            }),
            template(`export default SUITE;`)({
                SUITE: t.arrayExpression(tests),
            }),
        ]);
    }
    return generateProgram([
        dependencies,
        template(`
            export default PROPERTIES.reduce((suite, property) => {
                SUITE;

                return suite;
            }, []);
        `)({
            PROPERTIES: arrayOfStrings(opts.properties),
            SUITE: t.callExpression(
                t.memberExpression(
                    t.identifier('suite'),
                    t.identifier('push')
                ), tests),
        }),
    ]);
};
