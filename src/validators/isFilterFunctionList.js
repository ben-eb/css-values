import {walk} from 'postcss-value-parser';
import isAngle from './isAngle';
import isColor from './isColor';
import isEven from './isEven';
import isFunction from './isFunction';
import isLength from './isLength';
import isNumber from './isNumber';
import isPercentage from './isPercentage';
import isSpace from './isSpace';
import isVariable from './isVariable';

const numberPercentages = [
    'brightness',
    'contrast',
    'grayscale',
    'invert',
    'opacity',
    'sepia',
    'saturate',
];

function isNumberOrPercentage (node) {
    if (!isFunction(node, numberPercentages)) {
        return false;
    }
    const {nodes} = node;
    return nodes.length === 1 && (isNumber(nodes[0]) || isPercentage(nodes[0]));
}

function isBlur (node) {
    if (!isFunction(node, 'blur')) {
        return false;
    }
    const {nodes} = node;
    return nodes.length === 1 && isLength(nodes[0]);
}

function isDropShadow (node) {
    if (!isFunction(node, 'drop-shadow')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = isEven(index);
        if (even && index <= 2 && !isLength(child)) {
            valid = false;
            return false;
        }
        if (even && index === 4 && !isLength(child) && !isColor(child)) {
            valid = false;
            return false;
        }
        if (even && index === 6 && !isColor(child)) {
            valid = false;
            return false;
        }
        if (!even && !isSpace(child)) {
            valid = false;
            return false;
        }
    });
    return valid && node.nodes.length <= 7;
}

function isHueRotate (node) {
    if (!isFunction(node, 'hue-rotate')) {
        return false;
    }
    const {nodes} = node;
    return nodes.length === 1 && isAngle(nodes[0]);
}

function isFilterFunction (node) {
    return isBlur(node) ||
           isDropShadow(node) ||
           isHueRotate(node) ||
           isNumberOrPercentage(node);
}

export default function isFilterFunctionList (valueParserAST) {
    let valid = true;
    valueParserAST.walk((node, index) => {
        const even = isEven(index);
        if (even && !isFilterFunction(node) && !isVariable(node)) {
            valid = false;
        }
        if (!even && !isSpace(node)) {
            valid = false;
        }
        return false;
    });
    return valid;
}
