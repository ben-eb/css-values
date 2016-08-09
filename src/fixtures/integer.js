import getFirstNode from '../util/getFirstNode';

export const fixtures = {
    valid: ['10', '+10', '-10', '0', '+0', '-0'],
    invalid: ['12.0', '+---12', '3e4', '\\4E94', '_5', '"100"'],
};

export const nodes = {
    valid: fixtures.valid.map(getFirstNode),
    invalid: fixtures.invalid.map(getFirstNode),
};
