import {keywords} from '../validators/isTrackSize';
import lengthPercentage from './lengthPercentage';
import flex from './flex';
import minMax from './minMax';

export default {
    valid: [
        ...minMax.valid,
        ...keywords,
        ...lengthPercentage.valid,
        ...flex.valid,
    ],
    invalid: [
        ...minMax.invalid,
        ...lengthPercentage.invalid,
        ...flex.invalid,
    ],    
};
