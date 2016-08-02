export const numericSpacingValues = [
    'proportional-nums',
    'tabular-nums',
];

export default value => {
    return ~numericSpacingValues.indexOf(value);
};
