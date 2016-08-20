import endsWith from 'ends-with';
import {walk, unit} from 'postcss-value-parser';
import getArguments from './getArguments';
import isAngle from './isAngle';
import isColor from './isColor';
import isComma from './isComma';
import isCustomIdent from './isCustomIdent';
import isFunction from './isFunction';
import isKeyword from './isKeyword';
import isLength from './isLength';
import isLengthPercentage from './isLengthPercentage';
import isPercentage from './isPercentage';
import isPositionFactory from './isPosition';
import isResolution from './isResolution';
import isString from './isString';
import isUrl from './isUrl';

function isMultiplier ({type, value}) {
    if (type !== 'word') {
        return false;
    }
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        int.unit === 'x';
};

function isImageFunction (node) {
    if (!isFunction(node, 'image')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        if (index === 0 && !isImage(child) && !isString(child) && !isColor(child)) {
            valid = false;
        }
        if (index === 1 && !isComma(child)) {
            valid = false;
        }
        if (index === 2 && (isColor(node.nodes[0]) || !isColor(child))) {
            valid = false;
        }
        return false;
    });
    return valid && node.nodes.length <= 3;
}

function validateImageSet (group) {
    if (
        (!isImage(group[0]) && !isString(group[0])) ||
        isFunction(group[0], 'image-set') ||
        !group[2] ||
        (!isResolution(group[2]) && !isMultiplier(group[2]))
    ) {
        return false;
    }
    return group.length === 3;
}

function isImageSet (node) {
    if (!isFunction(node, 'image-set')) {
        return false;
    }
    return getArguments(node).every(validateImageSet);
}

function isElement (node) {
    if (!isFunction(node, 'element')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        if (index === 0 && !isCustomIdent(child)) {
            valid = false;
        }
        if (index === 1 && !isComma(child)) {
            valid = false;
        }
        if (index === 2 && !isKeyword(child, ['first', 'start', 'last', 'first-except'])) {
            valid = false;
        }
        return false;
    });
    return valid && (node.nodes.length === 1 || node.nodes.length === 3);
}

function isCrossFade (node) {
    if (!isFunction(node, 'cross-fade')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        if (index === 0 && !isPercentage(child) && !isImage(child)) {
            valid = false;
        }
        if (index === 2 && !isPercentage(child) && !isImage(child)) {
            valid = false;
        }
        if (index === 4 && !isImage(child) && !isColor(child)) {
            valid = false;
        }
        return false;
    });
    return valid;
}

function isColourStop (group) {
    const {length} = group;
    if (length === 1) {
        return isColor(group[0]);
    }
    if (length === 3) {
        return isColor(group[0]) && isLengthPercentage(group[2]);
    }
    return false;
}

const top = 'top';
const right = 'right';
const bottom = 'bottom';
const left = 'left';

const verticals = [top, bottom];
const horizontals = [right, left];
const directions = [...horizontals, ...verticals];

function isLinearGradient (node) {
    if (!isFunction(node, 'linear-gradient') && !isFunction(node, 'repeating-linear-gradient')) {
        return false;
    }
    let colours = 0;
    const valid = getArguments(node).every((group, index) => {
        if (index === 0) {
            const {length} = group;
            if (length === 1 && isAngle(group[0])) {
                return true;
            }
            if (length > 1 && group[0].value === 'to' && length <= 5) {
                return (
                    (!group[4] && isKeyword(group[2], directions)) ||
                    (isKeyword(group[2], horizontals) && isKeyword(group[4], verticals)) ||
                    (isKeyword(group[2], verticals) && isKeyword(group[4], horizontals))
                );
            }
        }
        const colour = isColourStop(group);
        if (colour) {
            colours ++;
        }
        return colour;
    });
    return valid && colours > 1;
}

const at = 'at';
const circle = 'circle';
const ellipse = 'ellipse';
const endingShapes = [circle, ellipse];

export const extentKeywords = [
    'closest-corner',
    'closest-side',
    'farthest-corner',
    'farthest-side',
];

const isRadialGradientPosition = isPositionFactory(false);

function isRadialGradient (node) {
    if (!isFunction(node, 'radial-gradient') && !isFunction(node, 'repeating-radial-gradient')) {
        return false;
    }
    let colours = 0;
    const valid = getArguments(node).every((group, index) => {
        if (index === 0) {
            const {length} = group;
            if (length === 1 && (
                isKeyword(group[0], endingShapes) ||
                isLength(group[0]) ||
                isKeyword(group[0], extentKeywords)
            )) {
                return true;
            }
            if (
                group[0].value === at &&
                isRadialGradientPosition({nodes: group.slice(2)})
            ) {
                return true;
            }
            if (length === 3 && (
                (group[0].value === circle && isLength(group[2])) ||
                (isLength(group[0]) && group[2].value === circle) ||
                (group[0].value === ellipse && isLengthPercentage(group[2])) ||
                (isLengthPercentage(group[0]) && group[2].value === ellipse) ||
                (isKeyword(group[0], extentKeywords) && isKeyword(group[2], endingShapes)) ||
                (isKeyword(group[0], endingShapes) && isKeyword(group[2], extentKeywords))
            )) {
                return true;
            }
            if (length > 3 && (
                (isKeyword(group[0], endingShapes) && group[2].value === at && isRadialGradientPosition({nodes: group.slice(4)})) ||
                (isKeyword(group[0], extentKeywords) && group[2].value === at && isRadialGradientPosition({nodes: group.slice(4)})) ||
                (isLength(group[0]) && group[2].value === at && isRadialGradientPosition({nodes: group.slice(4)})) ||
                (isLengthPercentage(group[0]) && isLengthPercentage(group[2]) && group[4].value === at && isRadialGradientPosition({nodes: group.slice(6)})) ||
                (group[0].value === circle && isLength(group[2]) && group[4].value === at && isRadialGradientPosition({nodes: group.slice(6)})) ||
                (isKeyword(group[0], endingShapes) && isKeyword(group[2], extentKeywords) && group[4].value === at && isRadialGradientPosition({nodes: group.slice(6)})) ||
                (group[0].value === ellipse && isLengthPercentage(group[2]) && isLengthPercentage(group[4]) && group[6].value === at && isRadialGradientPosition({nodes: group.slice(8)}))
            )) {
                return true;
            }
        }
        const colour = isColourStop(group);
        if (colour) {
            colours ++;
        }
        return colour;
    });
    return valid && colours > 1;
}

function isGradient (node) {
    return isLinearGradient(node) || isRadialGradient(node);
}

export default function isImage (node) {
    return isUrl(node) ||
           isImageFunction(node) ||
           isImageSet(node) ||
           isElement(node) ||
           isCrossFade(node) ||
           isGradient(node);
}

export const type = 'node';
