import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

const units = [
    's',
    'ms',
];

export default ({value}) => {
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        ~units.indexOf(int.unit);
};

export const type = 'node';
