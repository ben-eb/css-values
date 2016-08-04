import isNegative from './isNegative';
import isNumber from './isNumber';

export default (node) => {
    let int = isNumber(node);
    return int && int.unit === 'fr' && !isNegative(int.number);
};
