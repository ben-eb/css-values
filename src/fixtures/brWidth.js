import {brWidths} from '../validators/isBrWidth';
import length from './length';

export default {
    valid: [
        ...brWidths,
        ...brWidths.map(value => value.toUpperCase()),
        ...length.valid,
    ],
    invalid: [
        'huuuuge',
        ...length.invalid,
    ],
};
