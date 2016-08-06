import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const compositingOperators = [
    'add',
    'subtract',
    'intersect',
    'exclude',
];

export default node => isCaseInsensitiveKeyword(node, compositingOperators);

export const type = 'node';
