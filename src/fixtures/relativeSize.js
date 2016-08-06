import toWord from '../util/toWord';
import {relativeSizes} from '../validators/isRelativeSize';

export const fixtures = {
    valid: [
        ...relativeSizes,
        ...relativeSizes.map(value => value.toUpperCase()),
    ],
    invalid: ['larger-really-larger', 'smaller-still'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
