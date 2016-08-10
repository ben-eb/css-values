const valid = ['repeat-x', 'repeat-y', 'space round', 'no-repeat, no-repeat', 'var(--foo) var(--bar)'];

export default {
    valid: [
        ...valid,
        ...valid.map(value => value.toUpperCase()),
    ],
    invalid: ['space repeat-x', 'repeat-y round', 'space round repeat', 'repeat-xy', 'space / repeat', 'space,'],
};
