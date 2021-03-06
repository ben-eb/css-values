import endsWith from 'ends-with';
import {walk, unit} from 'postcss-value-parser';
import shouldReturnResult from '../util/shouldReturnResult';
import {invalidMessage} from '../util/validationMessages';
import getArguments from './getArguments';
import isAngle from './isAngle';
import isAt from './isAt';
import isColor from './isColor';
import isComma from './isComma';
import isCustomIdent from './isCustomIdent';
import isFunction from './isFunction';
import isKeyword from './isKeyword';
import isLength from './isLength';
import isLengthPercentage from './isLengthPercentage';
import isPercentage from './isPercentage';
import {isPositionNoRepeat} from './isPosition';
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

function isIdSelector ({type, value}) {
    if (type !== 'word') {
        return false;
    }
    if (value[0] !== '#') {
        return invalidMessage(
            `Expected "${value}" to start with a "#".`
        );
    }
    if (value[0] === '#' && !isCustomIdent({type: 'word', value: value.slice(1)})) {
        return invalidMessage(
            `Expected "${value}" to be a valid custom identifier.`
        );
    }
    return true;
}

function isElement (node) {
    if (!isFunction(node, 'element')) {
        return false;
    }
    if (node.nodes.length !== 1) {
        return false;
    }
    return isIdSelector(node.nodes[0]);
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
    if (!isFunction(node, ['linear-gradient', 'repeating-linear-gradient'])) {
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

const circle = 'circle';
const ellipse = 'ellipse';
const endingShapes = [circle, ellipse];

export const extentKeywords = [
    'closest-corner',
    'closest-side',
    'farthest-corner',
    'farthest-side',
];

function isRadialGradient (node) {
    if (!isFunction(node, ['radial-gradient', 'repeating-radial-gradient'])) {
        return false;
    }
    let colours = 0;
    const valid = getArguments(node).every((group, index) => {
        if (index === 0) {
            const {length} = group;
            const firstIsEndingShape = isKeyword(group[0], endingShapes);
            const firstIsLength = isLength(group[0]);
            const firstIsExtent = isKeyword(group[0], extentKeywords);
            if (length === 1 && (
                firstIsEndingShape ||
                firstIsLength ||
                firstIsExtent
            )) {
                return true;
            }
            const position2 = isPositionNoRepeat({nodes: group.slice(2)});
            if (isAt(group[0]) && position2) {
                return true;
            }
            const firstIsCircle = group[0].value === circle;
            const secondIsExtent = group[2] && isKeyword(group[2], extentKeywords);
            const secondIsEndingShape = group[2] && isKeyword(group[2], endingShapes);
            if (length === 3 && (
                (firstIsCircle && isLength(group[2])) ||
                (firstIsLength && group[2].value === circle) ||
                (firstIsExtent && secondIsEndingShape) ||
                (firstIsEndingShape && secondIsExtent)
            )) {
                return true;
            }
            const firstIsEllipse = group[0].value === ellipse;
            const firstIsLP = isLengthPercentage(group[0]);
            const secondIsLP = group[2] && isLengthPercentage(group[2]);
            const thirdIsLP = group[4] && isLengthPercentage(group[4]);
            const position4 = isPositionNoRepeat({nodes: group.slice(4)});
            const position6 = isPositionNoRepeat({nodes: group.slice(6)});
            const position8 = isPositionNoRepeat({nodes: group.slice(8)});
            if (length === 5 && (
                (firstIsEllipse && secondIsLP && thirdIsLP) ||
                (firstIsLP && secondIsLP && group[4].value === ellipse)
            )) {
                return true;
            }
            if (length > 3 && (
                (firstIsEndingShape && isAt(group[2]) && position4) ||
                (firstIsExtent && isAt(group[2]) && position4) ||
                (firstIsLength && isAt(group[2]) && position4) ||
                (firstIsLP && secondIsLP && isAt(group[4]) && position6) ||
                (firstIsCircle && isLength(group[2]) && isAt(group[4]) && position6) ||
                (firstIsEndingShape && secondIsExtent && isAt(group[4]) && position6) ||
                (firstIsExtent && secondIsEndingShape && isAt(group[4]) && position6) ||
                (firstIsEllipse && secondIsLP && thirdIsLP && isAt(group[6]) && position8) ||
                (firstIsLP && secondIsLP && group[4].value === ellipse && isAt(group[6]) && position8)
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
    const element = isElement(node);
    if (shouldReturnResult(element)) {
        return element;
    }
    return isUrl(node) ||
           isImageFunction(node) ||
           isImageSet(node) ||
           isCrossFade(node) ||
           isGradient(node);
}
