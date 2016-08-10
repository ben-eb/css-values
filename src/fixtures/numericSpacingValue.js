import {numericSpacingValues} from '../validators/isNumericSpacingValue';

export default {
    valid: [
        ...numericSpacingValues,
        ...numericSpacingValues.map(value => value.toUpperCase()),
    ],
    invalid: ['nummy-nums'],
};
