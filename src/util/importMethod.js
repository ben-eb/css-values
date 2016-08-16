import {importSpecifier} from 'babel-types';

/**
 * Import a method of the same name as the passed identifier from a file.
 * This method is a stub, intended to be used in conjunction with
 * an importDeclaration.
 *
 * @param  {Babel} identifier {@link https://github.com/babel/babel/tree/master/packages/babel-types#tidentifiername|t.identifier}
 * @return {Babel} {@link https://github.com/babel/babel/tree/master/packages/babel-types#timportspecifierlocal-imported|t.importSpecifier}
 * @example
 * import * as t from 'babel-types';
 *
 * const utils = t.importDeclaration([
 *     importMethod(t.identifier('lowercase')),
 * ], t.stringLiteral('./utils'));
 *
 * // => import {lowercase} from "./utils";
 */

export default function importMethod (identifier) {
    return importSpecifier(
        identifier,
        identifier
    );
}
