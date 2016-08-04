import toWord from '../util/toWord';

export const fixtures = {
    valid: ['0', '16px', '1pc', '2.34254645654324rem'],
    invalid: ['16.px', 'px16', 'one rem'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
