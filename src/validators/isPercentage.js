import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export default ({value}) => {
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        int.unit === '%';
};

export const type = 'node';
