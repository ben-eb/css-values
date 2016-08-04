import toWord from '../util/toWord';

export const fixtures = {
    valid: ['Bond-007', 'alpha', '_-_', '\\1F638', '-B'],
    invalid: ['007-Bond', '0B', '--B', '-0'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: [
        ...fixtures.invalid.map(toWord),
        {
            type: 'string',
            value: 'foobar',
            quote: '"',
        },
    ],
};
