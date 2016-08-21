import isKeyword from './isKeyword';

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

export default node => isKeyword(node, brStyles);
