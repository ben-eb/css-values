import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const singleAnimationPlayStates = [
    'running',
    'paused',
];

export default node => isCaseInsensitiveKeyword(node, singleAnimationPlayStates);

export const type = 'node';
