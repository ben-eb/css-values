import isNegative from './isNegative';
import isNumber from './isNumber';

export default num => {
    let int = isNumber(num);
    return int && int.unit === 'fr' && !isNegative(int.number);
};
