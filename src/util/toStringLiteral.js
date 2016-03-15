import {stringLiteral} from 'babel-types';

/**
 * Return a string literal. Wrapped method for array iteration.
 */

export default function toStringLiteral (value) {
    return stringLiteral(value);
}
