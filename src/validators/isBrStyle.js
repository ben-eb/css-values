import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const brStyles = [
    'none',
    'hidden',
    'dotted',
    'dashed',
    'solid',
    'double',
    'groove',
    'ridge',
    'inset',
    'outset',
];

export default node => isCaseInsensitiveKeyword(node, brStyles);

export const type = 'node';
