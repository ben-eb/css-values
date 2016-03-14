import isNumber from './isNumber';

const units = [
    's',
    'ms'
];

export default num => {
    let int = isNumber(num);
    return int && ~units.indexOf(int.unit);
};
