export const compositingOperators = [
    'add',
    'subtract',
    'intersect',
    'exclude',
];

export default value => {
    return ~compositingOperators.indexOf(value);
};
