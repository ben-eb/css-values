import toWord from '../util/toWord';
import {fixtures as length} from './length';
import {fixtures as percentage} from './percentage';

export const fixtures = {
    valid: [...length.valid, ...percentage.valid],
    invalid: [...length.invalid, ...percentage.invalid],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
