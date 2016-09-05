import * as t from 'babel-types';
import {createConst} from '../util/createVariable';

/**
 * Generate a validator function.
 *
 * @private
 * @param  {string} identifier The name of the validator function.
 * @param  {array}  body       The function's contents.
 * @return {Babel}             The generated validator.
 * @example
 * import * as t from 'babel-types';
 *
 * const validator = generateValidator('foo', [
 *     t.returnStatement(t.booleanLiteral(true)),
 * ]);
 *
 * // Outputs =>
 * // const foo = function foo (valueParserAST) {
 * //     return true;
 * // }
 */

export default function generateValidator (identifier, body) {
    return generateValidatorStub(
        identifier,
        t.functionExpression(
            t.identifier(identifier),
            [t.identifier('valueParserAST')],
            t.blockStatement(body)
        )
    );
}


/**
 * Generate a validator stub - this can be a function expression, or a
 * factory function call, etc.
 *
 * @private
 * @param  {string} identifier The name of the validator function.
 * @param  {array}  stub       What should be assigned to the validator.
 * @return {Babel}             The generated validator.
 * @example
 * import * as t from 'babel-types';
 *
 * const validator = generateValidatorStub('foo', t.identifier('isFoo'));
 *
 * // Outputs =>
 * // const foo = isFoo;
 */

export function generateValidatorStub (identifier, stub) {
    return createConst(
        t.identifier(identifier),
        stub
    );
}
