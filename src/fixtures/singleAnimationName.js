import customIdent from './customIdent';

export default {
    valid: [
        ...customIdent.valid,
        'none',
        'NONE',
    ],
    invalid: customIdent.invalid,
};
