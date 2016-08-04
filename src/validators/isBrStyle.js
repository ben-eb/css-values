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

export default ({type, value}) => {
    return type === 'word' && ~brStyles.indexOf(value);
};
