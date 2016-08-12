import isKeyword from './isKeyword';

export const singleAnimationFillModes = [
    'none',
    'forwards',
    'backwards',
    'both',
];

export default node => isKeyword(node, singleAnimationFillModes);

export const type = 'node';
