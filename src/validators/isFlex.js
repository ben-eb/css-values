import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';
import isNegative from './isNegative';

export default ({value}) => {
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        int.unit === 'fr' &&
        !isNegative(int.number);
};

export const type = 'node';
