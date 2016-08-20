import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export const resolutions = [
    'dpi',
    'dpcm',
    'dppx',
];

export default function isResolution ({type, value}) {
    if (type !== 'word') {
        return false;
    }
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        ~resolutions.indexOf(int.unit);
};
