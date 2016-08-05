import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

const lengths = [
    'em',
    'ex',
    'ch',
    'rem',
    'vh',
    'vw',
    'vmin',
    'vmax',
    'px',
    'q',
    'mm',
    'cm',
    'in',
    'pt',
    'pc',
];

export default ({value}) => {
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        (int.number === '0' || ~lengths.indexOf(int.unit));
};

export const type = 'node';
