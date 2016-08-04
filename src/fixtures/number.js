import toWord from '../util/toWord';

export const fixtures = {
    valid: ['12', '4.01', '-456.8', '0.0', '+0.0', '-0.0', '.60', '10e3', '-3.4e-2'],
    invalid: ['12.', '+-12.2', '12.1.1'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: [
        ...fixtures.invalid.map(toWord),
        {
            type: 'string',
            value: '10px',
            quote: '"',
        },
    ],
};
