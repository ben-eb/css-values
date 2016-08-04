export const maskingModes = [
    'alpha',
    'luminance',
    'match-source',
];

export default ({type, value}) => {
    return type === 'word' && ~maskingModes.indexOf(value);
};

export const type = 'node';
