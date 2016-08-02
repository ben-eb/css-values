export const singleAnimationPlayStates = [
    'running',
    'paused',
];

export default value => {
    return ~singleAnimationPlayStates.indexOf(value);
};
