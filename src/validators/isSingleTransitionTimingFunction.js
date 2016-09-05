import {walk} from 'postcss-value-parser';
import isEven from './isEven';
import isFunction from './isFunction';
import isKeyword from './isKeyword';
import isComma from './isComma';
import isInteger from './isInteger';
import isNumber from './isNumber';

export const keywords = [
    'ease',
    'linear',
    'ease-in',
    'ease-out',
    'ease-in-out',
    'step-start',
    'step-end',
];

export const stepsKeywords = [
    'start',
    'end',
];

export function isTimingKeyword (node) {
    return isKeyword(node, keywords);
}

export function isSteps (node) {
    if (!isFunction(node, 'steps') || !isInteger(node.nodes[0])) {
        return false;
    }
    const one = node.nodes[1];
    const two = node.nodes[2];
    if (one && !isComma(one)) {
        return false;
    }
    if (two) {
        return isKeyword(two, stepsKeywords);
    }
    return true;
}

export function isValidAbscissa ({type, value}) {
    return type === 'word' && value >= 0 && value <= 1;
}

export function isCubicBezier (node) {
    if (!isFunction(node, 'cubic-bezier')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = isEven(index);
        if (
            even && (
                ((index === 0 || index === 4) && !isValidAbscissa(child)) ||
                ((index === 2 || index === 6) && !isNumber(child))
            ) || !even && !isComma(child)
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

export default node => {
    return isTimingKeyword(node) || isSteps(node) || isCubicBezier(node);
};
