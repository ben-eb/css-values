import toWord from '../util/toWord';
import {brWidths} from '../validators/isBrWidth';

export const fixtures = {
    valid: brWidths,
    invalid: ['huuuuge'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
