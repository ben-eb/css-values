export const singleAnimationDirections = [
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
];

export default ({type, value}) => {
    return type === 'word' && ~singleAnimationDirections.indexOf(value);
};
