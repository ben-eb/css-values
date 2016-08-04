import isNumber from './isNumber';

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

export default node => {
    let int = isNumber(node);
    return int && (int.number === '0' || ~lengths.indexOf(int.unit));
};

export const type = 'node';
