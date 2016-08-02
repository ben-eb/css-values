export const singleAnimationDirections = [
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
];

export default value => {
    return ~singleAnimationDirections.indexOf(value);
};
