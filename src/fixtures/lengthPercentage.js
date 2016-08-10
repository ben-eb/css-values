import length from './length';
import percentage from './percentage';

export default {
    valid: [...length.valid, ...percentage.valid],
    invalid: [...length.invalid, ...percentage.invalid],
};
