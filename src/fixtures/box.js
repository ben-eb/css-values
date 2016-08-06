import toWord from '../util/toWord';
import {boxes} from '../validators/isBox';

export const fixtures = {
    valid: [
        ...boxes,
        ...boxes.map(value => value.toUpperCase()),
    ],
    invalid: ['rock-box'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
