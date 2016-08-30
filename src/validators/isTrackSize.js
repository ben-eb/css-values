import isLengthPercentage from './isLengthPercentage';
import isFlex from './isFlex';
import isKeyword from './isKeyword';
import isMinMax from './isMinMax';

export const keywords = [
    'min-content',
    'max-content',
    'auto',
];

export default (node) => {
    return isMinMax(node)
        || isFlex(node)
        || isLengthPercentage(node)
        || isKeyword(node, keywords);
};
