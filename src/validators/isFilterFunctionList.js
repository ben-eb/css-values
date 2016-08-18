import {walk} from 'postcss-value-parser';
import isAngle from './isAngle';
import isColor from './isColor';
import isFunction from './isFunction';
import isLength from './isLength';
import isNumber from './isNumber';
import isPercentage from './isPercentage';
import isSpace from './isSpace';
import isVariable from './isVariable';

function isNumberOrPercentageFactory (name) {
    return function isNumberOrPercentage (node) {
        if (!isFunction(node, name)) {
            return false;
        }
        const {nodes} = node;
        return nodes.length === 1 && (isNumber(nodes[0]) || isPercentage(nodes[0]));
    };
}

const isBrightness = isNumberOrPercentageFactory('brightness');
const isContrast = isNumberOrPercentageFactory('contrast');
const isGrayscale = isNumberOrPercentageFactory('grayscale');
const isInvert = isNumberOrPercentageFactory('invert');
const isOpacity = isNumberOrPercentageFactory('opacity');
const isSepia = isNumberOrPercentageFactory('sepia');
const isSaturate = isNumberOrPercentageFactory('saturate');

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
        const even = index % 2 === 0;
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
           isBrightness(node) ||
           isContrast(node) ||
           isDropShadow(node) ||
           isGrayscale(node) ||
           isHueRotate(node) ||
           isInvert(node) ||
           isOpacity(node) ||
           isSepia(node) ||
           isSaturate(node);
}

export default function isFilterFunctionList (parsed) {
    let valid = true;
    parsed.walk((node, index) => {
        const even = index % 2 === 0;
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

export const type = 'parsed';
