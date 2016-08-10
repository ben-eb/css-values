import {compositeStyles} from '../validators/isCompositeStyle';

export default {
    valid: [
        ...compositeStyles,
        ...compositeStyles.map(value => value.toUpperCase()),
    ],
    invalid: ['clear-xor-copy'],
};
