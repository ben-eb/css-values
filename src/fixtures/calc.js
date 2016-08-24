export default {
    valid: [
        'calc(40px)',
        'calc(100%)',
        'calc(12)',
        // 'calc(12.22)',
        'calc(90deg)',
        'calc(1500ms)',
        'calc(var(--someVar))',
        'calc(100% - 80px)',
        'calc(80px + 2 * 1em)',
        'calc(var(--widthA) / 2)',
        // 'calc(10px + (16px - 12px))',
    ],
    invalid: [
        'calc(12px-6px)',
        'calc(12px12px)',
        'calc(url(qwe.jpg))',
        'calc(12px*)',
        'calc(abc)',
        'calc()',
        'calc(+ 12px)',
        'calc(12px -)',
        'calc(12px + ())',
        'cacl()',
    ],
};
