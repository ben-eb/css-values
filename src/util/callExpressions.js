import * as t from 'babel-types';

/**
 * Assert that the return value from a call expression is falsey.
 *
 * @private
 * @param  {string} identifier The function call.
 * @param  {array} ...args     The rest of the arguments are passed as arguments
 * to the call expression. This should be composed of Babel nodes.
 * @return {Babel}             The expression.
 * @example
 * import * as t from 'babel-types';
 *
 * const expression = notCallExpression('foobar', t.booleanLiteral(true));
 * //=> !foobar(true);
 */

export function notCallExpression (identifier, ...args) {
    return t.unaryExpression('!', t.callExpression(
        t.identifier(identifier),
        args
    ));
}

/**
 * Assert that the return value from a call expression is truthy.
 *
 * @private
 * @param  {string} identifier The function call.
 * @param  {array} ...args     The rest of the arguments are passed as arguments
 * to the call expression. This should be composed of Babel nodes.
 * @return {Babel}             The expression.
 * @example
 * import * as t from 'babel-types';
 *
 * const expression = callExpression('foobar', t.booleanLiteral(true));
 * //=> foobar(true);
 */

export function callExpression (identifier, ...args) {
    return t.callExpression(
        t.identifier(identifier),
        args
    );
}
