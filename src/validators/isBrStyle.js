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

export default value => {
    return ~brStyles.indexOf(value);
};
