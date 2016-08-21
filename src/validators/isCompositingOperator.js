import isKeyword from './isKeyword';

export const compositingOperators = [
    'add',
    'subtract',
    'intersect',
    'exclude',
];

export default node => isKeyword(node, compositingOperators);
