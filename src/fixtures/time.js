import toWord from '../util/toWord';

export const fixtures = {
    valid: ['2s', '1500ms', '0.75s'],
    invalid: ['2 seconds', '1000μs', '10.s'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
