import isKeyword from './isKeyword';

export const singleAnimationPlayStates = [
    'running',
    'paused',
];

export default node => isKeyword(node, singleAnimationPlayStates);
