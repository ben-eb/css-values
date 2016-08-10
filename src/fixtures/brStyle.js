import {brStyles} from '../validators/isBrStyle';

export default {
    valid: [
        ...brStyles,
        ...brStyles.map(value => value.toUpperCase()),
    ],
    invalid: ['groovy'],
};
