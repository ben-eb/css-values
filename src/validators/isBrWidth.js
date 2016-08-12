import isKeyword from './isKeyword';
import isLength from './isLength';

export const brWidths = [
    'thin',
    'medium',
    'thick',
];

export default node => {
    return isLength(node) || isKeyword(node, brWidths);
};

export const type = 'node';
