import valueParser from 'postcss-value-parser';

export const fixtures = {
    valid: ['repeat-x', 'repeat-y', 'space round', 'no-repeat, no-repeat', 'var(--foo) var(--bar)'],
    invalid: ['space repeat-x', 'repeat-y round', 'space round repeat', 'repeat-xy', 'space / repeat', 'space,'],
};

export const nodes = {
    valid: fixtures.valid.map(valueParser),
    invalid: fixtures.invalid.map(valueParser),
};
