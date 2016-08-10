import {genericFamilies} from '../validators/isGenericFamily';

export default {
    valid: [
        ...genericFamilies,
        ...genericFamilies.map(value => value.toUpperCase()),
    ],
    invalid: ['such-font', 'many-ligatures'],
};
