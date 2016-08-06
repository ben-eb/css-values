import toWord from '../util/toWord';
import {maskingModes} from '../validators/isMaskingMode';

export const fixtures = {
    valid: [
        ...maskingModes,
        ...maskingModes.map(value => value.toUpperCase()),
    ],
    invalid: ['jim-carrey'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
