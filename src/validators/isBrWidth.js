import isLength from './isLength';

export const brWidths = [
    'thin',
    'medium',
    'thick',
];

export default node => {
    return isLength(node) || node.type === 'word' && ~brWidths.indexOf(node.value);
};

export const type = 'node';
