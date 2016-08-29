const valid = [
    '1px 1px 2px black',
    '#CCC 1px 0 10px',
    '5px 5px #558ABB',
    'white 2px 5px',
    '5px 10px',
    'white var(--foo) var(--bar)',
    'var(--foo) var(--bar) var(--baz)',
    'var(--foo) var(--bar) var(--baz) var(--quux)',
];

export default {
    valid: [
        ...valid,
        ...valid.map(f => `${f}, ${f}`),
    ],
    invalid: [
        '5px',
        '5px 10px 15px 20px',
        'white',
        'white 5px',
        'white 5px 5px white',
        'white/2px/5px',
        '5px 5px foobar',
        '5px white 5px',
        'var(--foo) var(--bar) var(--baz) var(--quux) var(--foobar)',
        'white 2px 5px,',
    ],
};
