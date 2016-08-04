export const relativeSizes = [
    'larger',
    'smaller',
];

export default ({type, value}) => {
    return type === 'word' && ~relativeSizes.indexOf(value);
};

export const type = 'node';
