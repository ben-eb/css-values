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
    return isBox(node)
        || isKeyword(node, geometryBoxes)
        || isKeyword(node, nonStandardKeywords);
};
