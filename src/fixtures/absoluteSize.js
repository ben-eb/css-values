import toWord from '../util/toWord';
import {absoluteSizes} from '../validators/isAbsoluteSize';

export const fixtures = {
    valid: [
        ...absoluteSizes,
        ...absoluteSizes.map(value => value.toUpperCase()),
    ],
    invalid: ['reallysmall', 'superduperlarge'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
