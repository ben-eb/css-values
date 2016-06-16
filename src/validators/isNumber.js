import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export default num => {
    let int = unit(num);
    if (int && !endsWith(int.number, '.') && !~int.unit.indexOf('.')) {
        return int;
    }
    return false;
};
