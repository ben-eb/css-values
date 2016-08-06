import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const relativeSizes = [
    'larger',
    'smaller',
];

export default node => isCaseInsensitiveKeyword(node, relativeSizes);

export const type = 'node';
