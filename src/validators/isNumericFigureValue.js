import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const numericFigureValues = [
    'lining-nums',
    'oldstyle-nums',
];

export default node => isCaseInsensitiveKeyword(node, numericFigureValues);

export const type = 'node';
