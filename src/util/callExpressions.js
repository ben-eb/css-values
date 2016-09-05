import * as t from 'babel-types';

/**
 * Assert that the return value from a call expression is falsey.
 *
 * @param  {string} identifier The function call.
 * @param  {array} ...args     An array of babel nodes.
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
 * @param  {string} identifier The function call.
 * @param  {array} ...args     An array of babel nodes.
 * @return {Babel}             The expression.
 * @example
 * import * as t from 'babel-types';
 *
 * const expression = notCallExpression('foobar', t.booleanLiteral(true));
 * //=> foobar(true);
 */

export function callExpression (identifier, ...args) {
    return t.callExpression(
        t.identifier(identifier),
        args
    );
}
