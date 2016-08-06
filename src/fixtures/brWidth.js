import toWord from '../util/toWord';
import {brWidths} from '../validators/isBrWidth';
import {fixtures as length} from './length';

export const fixtures = {
    valid: [
        ...brWidths,
        ...brWidths.map(value => value.toUpperCase()),
        ...length.valid,
    ],
    invalid: [
        'huuuuge',
        ...length.invalid,
    ],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
