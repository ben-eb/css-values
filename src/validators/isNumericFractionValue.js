import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const numericFractionValues = [
    'diagonal-fractions',
    'stacked-fractions',
];

export default node => isCaseInsensitiveKeyword(node, numericFractionValues);

export const type = 'node';
