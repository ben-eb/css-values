export const absoluteSizes = [
    'xx-small',
    'x-small',
    'small',
    'medium',
    'large',
    'x-large',
    'xx-large',
];

export default value => {
    return ~absoluteSizes.indexOf(value);
};
