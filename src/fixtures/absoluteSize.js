import toWord from '../util/toWord';
import {absoluteSizes} from '../validators/isAbsoluteSize';

export const fixtures = {
    valid: absoluteSizes,
    invalid: ['reallysmall', 'superduperlarge'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
