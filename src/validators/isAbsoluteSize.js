import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const absoluteSizes = [
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
];

export default node => isCaseInsensitiveKeyword(node, absoluteSizes);

export const type = 'node';
