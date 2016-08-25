import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';
import isCalc from './isCalc';

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

export default (node) => {
    if (isCalc(node)) {
        return true;
    }
    if (node.type !== 'word') {
        return false;
    }
    let int = unit(node.value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        (int.number === '0' || ~lengths.indexOf(int.unit));
};
