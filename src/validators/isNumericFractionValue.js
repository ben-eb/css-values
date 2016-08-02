export const numericFractionValues = [
    'diagonal-fractions',
    'stacked-fractions',
];

export default value => {
    return ~numericFractionValues.indexOf(value);    
};
