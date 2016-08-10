import {blendValues} from '../validators/isBlendMode';

export default {
    valid: [
        ...blendValues,
        ...blendValues.map(value => value.toUpperCase()),
    ],
    invalid: ['superblend', 'blend-man'],
};
