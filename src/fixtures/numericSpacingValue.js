import toWord from '../util/toWord';
import {numericSpacingValues} from '../validators/isNumericSpacingValue';

export const fixtures = {
    valid: numericSpacingValues,
    invalid: ['nummy-nums'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
