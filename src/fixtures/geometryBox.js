import {geometryBoxes, nonStandardKeywords} from '../validators/isGeometryBox';
import globals from '../util/globals';
import boxes from './box';

export default {
    valid: [
        ...geometryBoxes,
        ...nonStandardKeywords,
        ...boxes.valid,
        ...globals,
        'view-box, fill-box, border-box',
    ],
    invalid: [
        ...boxes.invalid,
        'view-box, fill-box, 1px',
    ],
};
