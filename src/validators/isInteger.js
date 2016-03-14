import {unit} from 'postcss-value-parser';

export default num => {
    let int = unit(num);
    return int && !~num.indexOf('.') && !int.unit;
};
