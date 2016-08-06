import {walk} from 'postcss-value-parser';
import isCaseInsensitiveFunction from './isCaseInsensitiveFunction';
import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
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

export function isKeyword (node) {
    return isCaseInsensitiveKeyword(node, keywords);
}

export function isSteps (node) {
    if (!isCaseInsensitiveFunction(node, 'steps') || !isInteger(node.nodes[0])) {
        return false;
    }
    const one = node.nodes[1];
    const two = node.nodes[2];
    if (one && one.type === 'div' && one.value !== ',') {
        return false;
    }
    if (two) {
        return isCaseInsensitiveKeyword(two, stepsKeywords);
    }
    return true;
}

export function isValidAbscissa ({type, value}) {
    return type === 'word' && value >= 0 && value <= 1;
}

export function isCubicBezier (node) {
    if (!isCaseInsensitiveFunction(node, 'cubic-bezier')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = index % 2 === 0;
        if (
            even && (
                ((index === 0 || index === 4) && !isValidAbscissa(child)) ||
                ((index === 2 || index === 6) && !isNumber(child))
            ) || !even && child.type === 'div' && child.value !== ','
        ) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

export default node => {
    return isKeyword(node) || isSteps(node) || isCubicBezier(node);
};

export const type = 'node';
