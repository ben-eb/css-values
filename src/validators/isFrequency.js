import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

const frequencies = [
    'Hz',
    'kHz',
];

export default ({type, value}) => {
    if (type !== 'word')  {
        return false;
    }
    let freq = unit(value);
    return freq &&
        !endsWith(freq.number, '.') &&
        !~freq.unit.indexOf('.') &&
        (freq.number === '0' || ~frequencies.indexOf(freq.unit));
};
