import ciFixtures from './customIdent';

export default {
    valid: [
        ...ciFixtures.valid,
        'NONE',
    ],
    invalid: ciFixtures.invalid,
};
