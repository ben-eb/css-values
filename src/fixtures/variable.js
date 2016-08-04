import valueParser from 'postcss-value-parser';

export const fixtures = {
    valid: ['var(--foo)'],
    invalid: ['variable(--foo)'],
};

export const nodes = {
    valid: [valueParser(fixtures.valid[0]).nodes[0]],
    invalid: [valueParser(fixtures.invalid[0]).nodes[0]],
};
