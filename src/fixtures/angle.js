import toWord from '../util/toWord';

export const fixtures = {
    valid: ['0', '90deg', '1turn', '100grad', '2rad'],
    invalid: ['1circle', 'halfturn', 'deg90'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
