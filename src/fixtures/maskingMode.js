import {maskingModes} from '../validators/isMaskingMode';

export default {
    valid: [
        ...maskingModes,
        ...maskingModes.map(value => value.toUpperCase()),
    ],
    invalid: [
        'jim-carrey',
        `${maskingModes[0]}/${maskingModes[0]}`,
    ],
};
