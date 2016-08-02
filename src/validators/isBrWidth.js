import isLength from './isLength';

export const brWidths = [
    'thin',
    'medium',
    'thick',
];

export default value => {
    return isLength(value) || ~brWidths.indexOf(value);
};
