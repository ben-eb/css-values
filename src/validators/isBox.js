import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const boxes = [
    'border-box',
    'padding-box',
    'content-box',
];

export default node => isCaseInsensitiveKeyword(node, boxes);

export const type = 'node';
