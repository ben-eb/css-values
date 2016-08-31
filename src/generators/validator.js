import * as t from 'babel-types';
import {createConst} from '../util/createVariable';

export default function generateValidator (identifier, body) {
    return createConst(
        t.identifier(identifier),
        t.functionExpression(
            t.identifier(identifier),
            [t.identifier('parsed')],
            t.blockStatement(body)
        )
    );
}

export function generateValidatorStub (identifier, stub) {
    return createConst(
        t.identifier(identifier),
        stub
    );
}
