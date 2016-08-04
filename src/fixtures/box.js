import toWord from '../util/toWord';
import {boxes} from '../validators/isBox';

export const fixtures = {
    valid: boxes,
    invalid: ['rock-box'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
