import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export default ({type, value}) => {
    if (type !== 'word') {
        return false;
    }
    let int = unit(value);
    return int &&
        !endsWith(int.number, '.') &&
        !~int.unit.indexOf('.') &&
        (!int.unit || /[0-9e\-]/i.test(int.unit));
};
