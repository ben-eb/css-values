import {geometryBoxes, nonStandardKeywords} from '../validators/isGeometryBox';
import boxes from './box';

export default {
    valid: [
        ...geometryBoxes,
        ...nonStandardKeywords,
        ...boxes.valid,
        'view-box',
        'fill-box',
        'border-box',
    ],
    invalid: [
        ...boxes.invalid,
        'view-box, fill-box, 1px',
        'view-box/fill-box',
    ],
};
