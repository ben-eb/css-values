import getFirstNode from '../util/getFirstNode';

export const fixtures = {
    valid: ['var(--foo)'],
    invalid: ['variable(--foo)'],
};

export const nodes = {
    valid: [getFirstNode(fixtures.valid[0])],
    invalid: [getFirstNode(fixtures.invalid[0])],
};
