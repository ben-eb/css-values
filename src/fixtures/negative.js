export const fixtures = {
    valid: ['-10', '-1.0', '-1000'],
    invalid: ['10', '1.0', '1000'],
};

// isNegative does not accept node types, so just alias
// the fixtures here instead.
export const nodes = fixtures;
