import getFirstNode from '../util/getFirstNode';

export const fixtures = {
    valid: ['var(--foo)', 'VAR(--foo)'],
    invalid: ['variable(--foo)'],
};

export const nodes = {
    valid: fixtures.valid.map(getFirstNode),
    invalid: fixtures.invalid.map(getFirstNode),
};
