export const numericFractionValues = [
    'diagonal-fractions',
    'stacked-fractions',
];

export default ({type, value}) => {
    return type === 'word' && ~numericFractionValues.indexOf(value);
};

export const type = 'node';
