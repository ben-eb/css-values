import isKeyword from './isKeyword';

export const boxes = [
    'border-box',
    'padding-box',
    'content-box',
];

export default node => isKeyword(node, boxes);

export const type = 'node';
