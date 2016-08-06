import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
import isLength from './isLength';

export const brWidths = [
    'thin',
    'medium',
    'thick',
];

export default node => {
    return isLength(node) || isCaseInsensitiveKeyword(node, brWidths);
};

export const type = 'node';
