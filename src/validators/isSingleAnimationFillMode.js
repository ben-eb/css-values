export const singleAnimationFillModes = [
    'none',
    'forwards',
    'backwards',
    'both',
];

export default ({type, value}) => {
    return type === 'word' && ~singleAnimationFillModes.indexOf(value);
};
