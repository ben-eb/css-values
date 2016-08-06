import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const numericSpacingValues = [
    'proportional-nums',
    'tabular-nums',
];

export default node => isCaseInsensitiveKeyword(node, numericSpacingValues);

export const type = 'node';
