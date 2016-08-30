import * as t from 'babel-types';
import {createConst} from '../util/createVariable';
import arrayOfStrings from '../util/arrayOfStrings';

export default function generateValidator (identifier, properties, body) {
    return createConst(
        t.identifier(identifier),
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
    return createConst(
        t.identifier(identifier),
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
