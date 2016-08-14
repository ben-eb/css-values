import camelCase from 'camelcase';
import * as t from 'babel-types';
import * as fixtures from '../fixtures/index';
import arrayOfStrings from '../util/arrayOfStrings';
import generateProgram from './program';
import requireModules from './requireModules';

function importMethod (identifier) {
    return t.importSpecifier(
        identifier,
        identifier
    );
}

function createTest (property, value, valid = true, message = false) {
    let args = [
        t.identifier(valid ? 'valid' : 'invalid'),
        property,
        value,
    ];
    if (message) {
        args.unshift(message);
    }
    return t.expressionStatement(
        t.callExpression(
            t.identifier('test'),
            args
        )
    );
}

function createTests ({properties, candidates, identifier}) {
    const id = t.variableDeclaration(
        'const', [
            t.variableDeclarator(
                t.identifier(identifier),
                properties.length > 1 ? arrayOfStrings(properties) : t.stringLiteral(properties[0])
            ),
        ]
    );
    return candidates.reduce((list, candidate) => {
        const {type, value} = candidate;
        if (type === 'keyword') {
            return [
                ...list,
                createTest(t.identifier(identifier), t.stringLiteral(value)),
                createTest(t.identifier(identifier), t.stringLiteral(value.toUpperCase())),
                createTest(t.identifier(identifier), t.stringLiteral(`${value} ${value}`), false),
            ];
        }
        if (type === 'data') {
            const camel = camelCase(value);
            if (!fixtures[camel]) {
                return list;
            }
            const values = fixtures[camel];
            list.push.apply(list, values.valid.map(fixture => {
                return createTest(t.identifier(identifier), t.stringLiteral(fixture));
            }));
            list.push.apply(list, values.invalid.map(fixture => {
                return createTest(t.identifier(identifier), t.stringLiteral(fixture), false);
            }));
            if (candidate.min === 1) {
                if (candidate.max === false && candidate.separator === ',') {
                    list.push(
                        createTest(t.identifier(identifier), t.stringLiteral(`${values.valid[0]}, ${values.valid[0]}`)),
                        createTest(t.identifier(identifier), t.stringLiteral(`${values.valid[0]}, ${values.valid[0]},`), false),
                        createTest(t.identifier(identifier), t.stringLiteral(`var(--foo), var(--bar)`)),
                        createTest(t.identifier(identifier), t.stringLiteral(`var(--foo), var(--bar),`), false),
                    );
                } else if (candidate.separator === ' ') {
                    list.push(
                        createTest(t.identifier(identifier), t.stringLiteral(`${values.valid[0]} ${values.valid[0]}`)),
                        createTest(t.identifier(identifier), t.stringLiteral(`${values.valid[0]}, ${values.valid[0]}`), false),
                        createTest(t.identifier(identifier), t.stringLiteral(`var(--foo) var(--bar)`)),
                        createTest(t.identifier(identifier), t.stringLiteral(`var(--foo), var(--bar)`), false),
                    );
                }
            } else {
                list.push(createTest(t.identifier(identifier), t.stringLiteral(`${values.valid[0]} ${values.valid[0]}`), false));
            }
        }
        return list;
    }, [
        id,
        t.expressionStatement(
            t.callExpression(
                t.identifier('test'), [
                    t.identifier('globals'),
                    t.identifier(identifier),
                ]
            )
        ),
    ]);
}

export default config => {
    return generateProgram([
        requireModules({
            identifier: 'test',
            module: 'ava',
        }, {
            identifier: 'valueParser',
            module: 'postcss-value-parser',
        }),
        t.importDeclaration([
            importMethod(t.identifier('invalid')),
            importMethod(t.identifier('valid')),
            importMethod(t.identifier('globals')),
        ], t.stringLiteral('./util/testMacro')),
        ...config.reduce((list, descriptor) => {
            return [
                ...list,
                ...createTests(descriptor),
            ];
        }, []),
        createTest(
            t.stringLiteral('color'),
            t.callExpression(
                t.identifier('valueParser'), [
                    t.stringLiteral('blue'),
                ]
            ),
            true,
            t.stringLiteral('should accept an ast')
        ),
    ]);
};
