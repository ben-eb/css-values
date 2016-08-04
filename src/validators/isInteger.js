import {unit} from 'postcss-value-parser';

export default ({type, value}) => {
    if (type !== 'word') {
        return false;
    }
    let int = unit(value);
    return int && !~value.indexOf('.') && !int.unit;
};

export const type = 'node';
