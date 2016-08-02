export const numericFigureValues = [
    'lining-nums',
    'oldstyle-nums',
];

export default value => {
    return ~numericFigureValues.indexOf(value);
};
