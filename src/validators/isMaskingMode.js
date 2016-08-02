export const maskingModes = [
    'alpha',
    'luminance',
    'match-source',
];

export default value => {
    return ~maskingModes.indexOf(value);
};
