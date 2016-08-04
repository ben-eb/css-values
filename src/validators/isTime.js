import isNumber from './isNumber';

const units = [
    's',
    'ms',
];

export default node => {
    let int = isNumber(node);
    return int && ~units.indexOf(int.unit);
};
