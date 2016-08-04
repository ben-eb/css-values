import toWord from '../util/toWord';

export const fixtures = {
    valid: ['1%', '88%', '99.99%', '+100%'],
    invalid: ['12.%', '42.2.3.4.7.8.1.2%'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
