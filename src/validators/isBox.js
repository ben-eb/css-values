export const boxes = [
    'border-box',
    'padding-box',
    'content-box',
];

export default ({type, value}) => {
    return type === 'word' && ~boxes.indexOf(value);
};
