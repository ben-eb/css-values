import isNumber from './isNumber';

export default node => {
    let int = isNumber(node);
    return int && int.unit === '%';
};

export const type = 'node';
