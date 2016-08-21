import isKeyword from './isKeyword';

export const relativeSizes = [
    'larger',
    'smaller',
];

export default node => isKeyword(node, relativeSizes);
