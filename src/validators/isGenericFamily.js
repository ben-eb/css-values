import isKeyword from './isKeyword';

export const genericFamilies = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
];

export default node => isKeyword(node, genericFamilies);

export const type = 'node';
