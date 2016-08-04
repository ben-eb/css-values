export const absoluteSizes = [
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
];

export default ({type, value}) => {
    return type === 'word' && ~absoluteSizes.indexOf(value);
};
