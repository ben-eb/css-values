import toWord from '../util/toWord';
import {maskingModes} from '../validators/isMaskingMode';

export const fixtures = {
    valid: maskingModes,
    invalid: ['jim-carrey'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
