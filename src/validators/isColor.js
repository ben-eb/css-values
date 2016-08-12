import {walk} from 'postcss-value-parser';
import colors from 'css-color-names';
import isFunction from './isFunction';
import isKeyword from './isKeyword';
import isComma from './isComma';
import isInteger from './isInteger';
import isNumber from './isNumber';
import isPercentage from './isPercentage';

const namedColours = Object.keys(colors);

export function isRgb (node) {
    if (!isFunction(node, 'rgb')) {
        return;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (!isInteger(child) && !isPercentage(child)) ||
            !even && !isComma(child)
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 5;
}

export function isRgba (node) {
    if (!isFunction(node, 'rgba')) {
        return;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (
                (index < 6 && !isInteger(child) && !isPercentage(child)) ||
                (index > 5 && !isNumber(child))
            ) || !even && !isComma(child)
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

export function isHsl (node) {
    if (!isFunction(node, 'hsl')) {
        return;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (
                (index < 1 && !isNumber(child)) ||
                (index > 1 && !isPercentage(child))
            ) || !even && !isComma(child)
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 5;
}

export function isHsla (node) {
    if (!isFunction(node, 'hsla')) {
        return;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (
                ((index === 0 || index === 6) && !isNumber(child)) ||
                ((index === 2 || index === 4) && !isPercentage(child))
            ) || !even && !isComma(child)
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

export function isHex (node) {
    if (node.type !== 'word' || node.value[0] !== '#') {
        return false;
    }
    const range = node.value.slice(1);
    return ~[3, 4, 6, 8].indexOf(range.length) && !isNaN(parseInt(range, 16));
}

export function isNamedColor (node) {
    return isKeyword(node, namedColours);
}

export function isCurrentColor (node) {
    return node.type === 'word' && node.value.toLowerCase() === 'currentcolor';
}

export default function isColor (node) {
    return isRgb(node) ||
           isRgba(node) ||
           isHsl(node) ||
           isHsla(node) ||
           isHex(node) ||
           isNamedColor(node) ||
           isCurrentColor(node);
}

export const type = 'node';
