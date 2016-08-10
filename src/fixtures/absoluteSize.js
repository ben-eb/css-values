import {absoluteSizes} from '../validators/isAbsoluteSize';

export default {
    valid: [
        ...absoluteSizes,
        ...absoluteSizes.map(value => value.toUpperCase()),
    ],
    invalid: ['reallysmall', 'superduperlarge'],
};
