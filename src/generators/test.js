import * as t from 'babel-types';
import camelCase from 'camelcase';
import arrayOfStrings from '../util/arrayOfStrings';
import globals from '../util/globals';
import template from '../util/moduleTemplate';
import * as fixtures from '../fixtures/index';
import generateProgram from './program';

function createTest (fixture, valid = true) {
    return t.objectExpression([
        t.objectProperty(
            t.identifier('fixture'),
            t.binaryExpression(
                '+',
                t.identifier('property'),
                t.stringLiteral(`: ${fixture}`)
            )
        ),
        t.objectProperty(
            t.identifier('valid'),
            t.identifier(valid ? 'true' : 'false')
        ),
    ]);
}

export default opts => {
    const tests = opts.candidates.reduce((list, candidate) => {
        if (candidate.type === 'keyword') {
            list.push(createTest(candidate.value));
        }
        if (candidate.type === 'data') {
            const camel = camelCase(candidate.value);
            if (fixtures[camel]) { // eslint-disable-line
                const values = fixtures[camel].fixtures; // eslint-disable-line
                list.push.apply(list, values.valid.map(fixture => {
                    return createTest(fixture);
                }));
                list.push.apply(list, values.invalid.map(fixture => {
                    return createTest(fixture, false);
                }));
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
    }, [...globals, ...globals.map(val => val.toUpperCase()), 'var(--foo)'].map(ident => createTest(ident)));
    if (opts.properties.length === 1) {
        return generateProgram([
            template(`const property = PROPERTY;`)({
                PROPERTY: t.stringLiteral(opts.properties[0]),
            }),
            template(`export default SUITE;`)({
                SUITE: t.arrayExpression(tests),
            }),
        ]);
    }
    return generateProgram([
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
