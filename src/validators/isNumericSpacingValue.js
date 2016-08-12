import isKeyword from './isKeyword';

export const numericSpacingValues = [
    'proportional-nums',
    'tabular-nums',
];

export default node => isKeyword(node, numericSpacingValues);

export const type = 'node';
