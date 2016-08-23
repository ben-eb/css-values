import {unit} from 'postcss-value-parser';
import endsWith from 'ends-with';

export default ({type, value}) => {
    if (type !== 'word') {
        return false;
    }

    let int = unit(value);

    return !isNaN(value) && !endsWith(int.number, '.');
};
