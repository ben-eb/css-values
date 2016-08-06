import toWord from '../util/toWord';
import {genericFamilies} from '../validators/isGenericFamily';

export const fixtures = {
    valid: [
        ...genericFamilies,
        ...genericFamilies.map(value => value.toUpperCase()),
    ],
    invalid: ['such-font', 'many-ligatures'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
