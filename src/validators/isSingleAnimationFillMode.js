export const singleAnimationFillModes = [
    'none',
    'forwards',
    'backwards',
    'both',
];

export default value => {
    return ~singleAnimationFillModes.indexOf(value);
};
