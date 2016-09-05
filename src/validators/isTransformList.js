import {walk} from 'postcss-value-parser';
import isAngle from './isAngle';
import isComma from './isComma';
import isEven from './isEven';
import isFunction from './isFunction';
import isLength from './isLength';
import isLengthPercentage from './isLengthPercentage';
import isNumber from './isNumber';
import isSpace from './isSpace';
import isVariable from './isVariable';

const matrix = 'matrix';
const matrix3d = 'matrix3d';

function isMatrix (node) {
    if (!isFunction(node, [matrix, matrix3d])) {
        return false;
    }
    if (
        node.value === matrix && node.nodes.length !== 11 ||
        node.value === matrix3d && node.nodes.length !== 31
    ) {
        return false;
    }

    let valid = true;

    walk(node.nodes, (child, index) => {
        const even = isEven(index);
        if (even && !isNumber(child) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid;
}

function isMultipleValue (name, fn) {
    return node => {
        if (!isFunction(node, name)) {
            return false;
        }
        if (node.nodes.length > 3) {
            return false;
        }

        let valid = true;

        walk(node.nodes, (child, index) => {
            const even = isEven(index);
            if (even && !fn(child) || !even && !isComma(child)) {
                valid = false;
            }
            return false;
        });

        if (isComma(node.nodes[node.nodes.length - 1])) {
            return false;
        }
        return valid;
    };
}

const isTranslate = isMultipleValue('translate', isLengthPercentage);
const isScale = isMultipleValue('scale', isNumber);
const isSkew = isMultipleValue('skew', isAngle);

export const singleNumbers = [
    'scaleX',
    'scaleY',
    'scaleZ',
];

export const singleAngles = [
    'rotate',
    'skewX',
    'skewY',
    'rotateX',
    'rotateY',
    'rotateZ',
];

export const singleLengths = [
    'perspective',
    'translateZ',
];

export const singleLPs = [
    'translateX',
    'translateY',
];

function isSingleValidator (name, fn) {
    return node => {
        if (!isFunction(node, name)) {
            return false;
        }
        if (node.nodes.length !== 1) {
            return false;
        }
        return fn(node.nodes[0]);
    };
}

const isSingleLP = isSingleValidator(singleLPs, isLengthPercentage);
const isSingleNumber = isSingleValidator(singleNumbers, isNumber);
const isSingleAngle = isSingleValidator(singleAngles, isAngle);
const isSingleLength = isSingleValidator(singleLengths, isLength);

function isTranslate3d (node) {
    if (!isFunction(node, 'translate3d')) {
        return false;
    }
    const {nodes} = node;
    if (nodes.length !== 5) {
        return false;
    }
    return isLengthPercentage(nodes[0]) &&
           isComma(nodes[1]) &&
           isLengthPercentage(nodes[2]) &&
           isComma(nodes[3]) &&
           isLength(nodes[4]);
}

function isScale3d (node) {
    if (!isFunction(node, 'scale3d')) {
        return false;
    }
    const {nodes} = node;
    if (nodes.length !== 5) {
        return false;
    }
    return isNumber(nodes[0]) &&
           isComma(nodes[1]) &&
           isNumber(nodes[2]) &&
           isComma(nodes[3]) &&
           isNumber(nodes[4]);
}

function isRotate3d (node) {
    if (!isFunction(node, 'rotate3d')) {
        return false;
    }
    const {nodes} = node;
    if (nodes.length !== 7) {
        return false;
    }
    return isNumber(nodes[0]) &&
           isComma(nodes[1]) &&
           isNumber(nodes[2]) &&
           isComma(nodes[3]) &&
           isNumber(nodes[4]) &&
           isComma(nodes[5]) &&
           isAngle(nodes[6]);
}

function validateNode (node) {
    return isMatrix(node)       ||
           isRotate3d(node)     ||
           isScale(node)        ||
           isScale3d(node)      ||
           isSkew(node)         ||
           isSingleAngle(node)  ||
           isSingleLength(node) ||
           isSingleLP(node)     ||
           isSingleNumber(node) ||
           isTranslate(node)    ||
           isTranslate3d(node)  ||
           isVariable(node);
}

export default function isTransformList (parsed) {
    let valid = true;

    parsed.walk((node, index) => {
        const even = isEven(index);
        if (even && !validateNode(node) || !even && !isSpace(node)) {
            valid = false;
        }
        return false;
    });

    return valid;
}
