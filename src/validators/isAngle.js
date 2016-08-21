/*
 * See the specification for more details:
 * https://drafts.csswg.org/css-values-3/#angles
 */

import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

const angles = [
    'deg',
    'grad',
    'rad',
    'turn',
];

export default ({value}) => {
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        (int.number === '0' || ~angles.indexOf(int.unit));
};
