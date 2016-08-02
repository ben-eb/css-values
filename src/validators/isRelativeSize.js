export const relativeSizes = [
    'larger',
    'smaller',
];

export default value => {
    return ~relativeSizes.indexOf(value);
};
