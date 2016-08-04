import toWord from '../util/toWord';

export const fixtures = {
    valid: ['.25fr', '0.5fr', '1fr', '2fr'],
    invalid: ['-0.5fr', '-2fr'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
