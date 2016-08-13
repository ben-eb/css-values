import * as t from 'babel-types';
import arrayOfStrings from '../util/arrayOfStrings';

export default function generateValidator (identifier, properties, body) {
    return t.exportDefaultDeclaration(
        t.objectExpression([
            t.objectProperty(
                t.identifier('properties'),
                arrayOfStrings(properties)
            ),
            t.objectProperty(
                t.identifier('fn'),
                t.functionExpression(
                    t.identifier(identifier),
                    [t.identifier('parsed')],
                    t.blockStatement(body)
                )
            ),
        ])
    );
}

export function generateValidatorStub (identifier, properties, stub) {
    return t.exportDefaultDeclaration(
        t.objectExpression([
            t.objectProperty(
                t.identifier('properties'),
                arrayOfStrings(properties)
            ),
            t.objectProperty(
                t.identifier('fn'),
                stub
            ),
        ])
    );
}
