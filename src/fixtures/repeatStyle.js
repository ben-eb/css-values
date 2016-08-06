import valueParser from 'postcss-value-parser';

const valid = ['repeat-x', 'repeat-y', 'space round', 'no-repeat, no-repeat', 'var(--foo) var(--bar)'];

export const fixtures = {
    valid: [
        ...valid,
        ...valid.map(value => value.toUpperCase()),
    ],
    invalid: ['space repeat-x', 'repeat-y round', 'space round repeat', 'repeat-xy', 'space / repeat', 'space,'],
};

export const nodes = {
    valid: fixtures.valid.map(valueParser),
    invalid: fixtures.invalid.map(valueParser),
};
