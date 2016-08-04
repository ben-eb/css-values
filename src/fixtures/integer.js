import toWord from '../util/toWord';

export const fixtures = {
    valid: ['10', '+10', '-10', '0', '+0', '-0'],
    invalid: ['12.0', '+---12', '3e4', '\\4E94', '_5'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: [
        ...fixtures.invalid.map(toWord),
        {
            type: 'string',
            value: '100',
            quote: '"',
        },
    ],
};
