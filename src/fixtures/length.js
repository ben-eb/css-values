import getFirstNode from '../util/getFirstNode';

export const fixtures = {
    valid: ['0', '16px', '1pc', '2.34254645654324rem'],
    invalid: ['16.px', 'px16', 'one rem', '"1rem"'],
};

export const nodes = {
    valid: fixtures.valid.map(getFirstNode),
    invalid: fixtures.invalid.map(getFirstNode),
};
