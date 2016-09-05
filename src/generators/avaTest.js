import * as t from 'babel-types';

/**
 * Generate an AVA test.
 *
 * @private
 * @param  {Babel} ...args Pass any number of Babel nodes as arguments to the test function.
 * @return {Babel}         {@link https://github.com/babel/babel/tree/master/packages/babel-types#texpressionstatementexpression|t.expressionStatement}
 * @example
 * import * as t from 'babel-types';
 *
 * const test = avaTest(t.stringLiteral('description'), t.identifier('valid'));
 *
 * // => test('description', valid);
 */

export default function avaTest (...args) {
    return t.expressionStatement(
        t.callExpression(
            t.identifier('test'),
            args
        )
    );
}
