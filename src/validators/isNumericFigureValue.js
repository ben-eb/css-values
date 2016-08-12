import isKeyword from './isKeyword';

export const numericFigureValues = [
    'lining-nums',
    'oldstyle-nums',
];

export default node => isKeyword(node, numericFigureValues);

export const type = 'node';
