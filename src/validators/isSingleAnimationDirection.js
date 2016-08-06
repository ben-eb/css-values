import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const singleAnimationDirections = [
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
];

export default node => isCaseInsensitiveKeyword(node, singleAnimationDirections);

export const type = 'node';
