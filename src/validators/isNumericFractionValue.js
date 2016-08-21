import isKeyword from './isKeyword';

export const numericFractionValues = [
    'diagonal-fractions',
    'stacked-fractions',
];

export default node => isKeyword(node, numericFractionValues);
