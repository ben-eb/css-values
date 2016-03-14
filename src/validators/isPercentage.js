import isNumber from './isNumber';

export default num => {
    let int = isNumber(num);
    return int && int.unit === '%';
};
