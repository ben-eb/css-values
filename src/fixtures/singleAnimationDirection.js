import {singleAnimationDirections} from '../validators/isSingleAnimationDirection';

export default {
    valid: [
        ...singleAnimationDirections,
        ...singleAnimationDirections.map(value => value.toUpperCase()),
    ],
    invalid: ['alternate-normal-reverse'],
};
