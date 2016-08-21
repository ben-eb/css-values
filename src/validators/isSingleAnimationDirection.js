import isKeyword from './isKeyword';

export const singleAnimationDirections = [
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
];

export default node => isKeyword(node, singleAnimationDirections);
