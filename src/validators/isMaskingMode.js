import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const maskingModes = [
    'alpha',
    'luminance',
    'match-source',
];

export default node => isCaseInsensitiveKeyword(node, maskingModes);

export const type = 'node';
