import {singleAnimationPlayStates} from '../validators/isSingleAnimationPlayState';

export default {
    valid: [
        ...singleAnimationPlayStates,
        ...singleAnimationPlayStates.map(value => value.toUpperCase()),
    ],
    invalid: ['running-paused'],
};
