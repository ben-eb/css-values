import {walk} from 'postcss-value-parser';
import globals from '../util/globals';
import isKeyword from './isKeyword';
import isBox from './isBox';

export const geometryBoxes = [
    'margin-box',
    'fill-box',
    'stroke-box',
    'view-box',
];

export const nonStandardKeywords = [
    'content',
    'padding',
    'border',
];

export default (node) => {
    let valid = true;
    if (node.nodes) {
        walk(node.nodes, (child) => {
            if (!isBox(child) && !isKeyword(child, geometryBoxes)) {
                valid = false;
            }
        });
    } else if (!isBox(node)
        && !isKeyword(node, geometryBoxes)
        && !isKeyword(node, nonStandardKeywords)
        && !isKeyword(node, globals) ) {
        valid = false;
    }
    return valid;
};

export const type = 'node';
