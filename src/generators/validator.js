import * as t from 'babel-types';
import {createConst} from '../util/createVariable';

/**
 * Generate a validator function.
 *
 * @private
 * @param  {string} identifier The name of the validator function.
 * @param  {array}  keywords   The list of keywords.
 * @param  {array}  body       The function's contents.
 * @return {Babel}             The generated validator.
 * @example
 * import * as t from 'babel-types';
 * import {createConst} from '../util/createVariable';
 *
 * const keywords = createConst(
 *     t.identifier('fooKeywords'),
 *     arrayOfStrings(['foo', 'bar'])
 * );
 * const validator = generateValidator('foo', keywords, [
 *     t.returnStatement(t.booleanLiteral(true)),
 * ]);
 *
 * // Outputs =>
 * // const fooKeywords = ['foo', 'bar'];
 * // const foo = function foo (valueParserAST) {
 * //     return true;
 * // }
 */

export default function generateValidator (identifier, keywords, body) {
    const id = t.identifier(identifier);
    return [
        ...keywords,
        createConst(
            id,
            t.functionExpression(
                id,
                [t.identifier('valueParserAST')],
                t.blockStatement(body)
            )
        ),
    ];
}
