import {value} from '../validators/isSingleAnimationIterationCount';
import number from './number';

export default {
    valid: [
        ...number.valid,
        ...value,
    ],
    invalid: number.invalid,
};
