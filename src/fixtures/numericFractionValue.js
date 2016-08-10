import {numericFractionValues} from '../validators/isNumericFractionValue';

export default {
    valid: [
        ...numericFractionValues,
        ...numericFractionValues.map(value => value.toUpperCase()),
    ],
    invalid: ['any-fractions'],
};
