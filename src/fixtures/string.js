import getFirstNode from '../util/getFirstNode';

export const fixtures = {
    valid: [`"foo"`, `'bar'`],
    invalid: [`baz`, '`quux`'],
};

export const nodes = {
    valid: fixtures.valid.map(getFirstNode),
    invalid: fixtures.invalid.map(getFirstNode),
};
