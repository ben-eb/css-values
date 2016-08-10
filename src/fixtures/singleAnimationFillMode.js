import {singleAnimationFillModes} from '../validators/isSingleAnimationFillMode';

export default {
    valid: [
        ...singleAnimationFillModes,
        ...singleAnimationFillModes.map(value => value.toUpperCase()),
    ],
    invalid: ['forwards-backwards'],
};
