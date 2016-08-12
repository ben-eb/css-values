import isKeyword from './isKeyword';

export const absoluteSizes = [
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
];

export default node => isKeyword(node, absoluteSizes);

export const type = 'node';
