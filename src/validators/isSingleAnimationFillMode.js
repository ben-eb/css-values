import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const singleAnimationFillModes = [
    'none',
    'forwards',
    'backwards',
    'both',
];

export default node => isCaseInsensitiveKeyword(node, singleAnimationFillModes);

export const type = 'node';
