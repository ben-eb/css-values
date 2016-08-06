import toWord from '../util/toWord';
import {numericFractionValues} from '../validators/isNumericFractionValue';

export const fixtures = {
    valid: [
        ...numericFractionValues,
        ...numericFractionValues.map(value => value.toUpperCase()),
    ],
    invalid: ['any-fractions'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
