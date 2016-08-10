import {relativeSizes} from '../validators/isRelativeSize';

export default {
    valid: [
        ...relativeSizes,
        ...relativeSizes.map(value => value.toUpperCase()),
    ],
    invalid: ['larger-really-larger', 'smaller-still'],
};
