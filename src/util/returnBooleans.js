import * as t from 'babel-types';

/**
 * Syntactic sugar for injecting a `return true;` statement into a Babel AST.
 *
 * @private
 */

export const returnTrue = t.returnStatement(t.booleanLiteral(true));

/**
 * Syntactic sugar for injecting a `return false;` statement into a Babel AST.
 *
 * @private
 */

export const returnFalse = t.returnStatement(t.booleanLiteral(false));
