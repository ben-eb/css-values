export const compositingOperators = [
    'add',
    'subtract',
    'intersect',
    'exclude',
];

export default ({type, value}) => {
    return type === 'word' && ~compositingOperators.indexOf(value);
};
