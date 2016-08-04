export const numericSpacingValues = [
    'proportional-nums',
    'tabular-nums',
];

export default ({type, value}) => {
    return type === 'word' && ~numericSpacingValues.indexOf(value);
};

export const type = 'node';
