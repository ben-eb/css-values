export const singleAnimationPlayStates = [
    'running',
    'paused',
];

export default ({type, value}) => {
    return type === 'word' && ~singleAnimationPlayStates.indexOf(value);
};
