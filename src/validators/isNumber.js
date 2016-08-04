import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export default ({type, value}) => {
    if (type !== 'word') {
        return false;
    }
    let int = unit(value);
    if (int && !endsWith(int.number, '.') && !~int.unit.indexOf('.')) {
        return int;
    }
    return false;
};
