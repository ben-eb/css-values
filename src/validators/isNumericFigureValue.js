export const numericFigureValues = [
    'lining-nums',
    'oldstyle-nums',
];

export default ({type, value}) => {
    return type === 'word' && ~numericFigureValues.indexOf(value);
};

export const type = 'node';
