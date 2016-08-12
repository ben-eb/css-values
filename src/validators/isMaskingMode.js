import isKeyword from './isKeyword';

export const maskingModes = [
    'alpha',
    'luminance',
    'match-source',
];

export default node => isKeyword(node, maskingModes);

export const type = 'node';
