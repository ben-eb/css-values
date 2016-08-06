import toWord from '../util/toWord';
import {blendValues} from '../validators/isBlendMode';

export const fixtures = {
    valid: [
        ...blendValues,
        ...blendValues.map(value => value.toUpperCase()),
    ],
    invalid: ['superblend', 'blend-man'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
