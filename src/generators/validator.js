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
    const id = t.identifier(identifier);
    return createConst(
        id,
        t.functionExpression(
            id,
            [t.identifier('valueParserAST')],
            t.blockStatement(body)
        )
    );
}
