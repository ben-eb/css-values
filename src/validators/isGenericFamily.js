import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const genericFamilies = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
];

export default node => isCaseInsensitiveKeyword(node, genericFamilies);

export const type = 'node';
