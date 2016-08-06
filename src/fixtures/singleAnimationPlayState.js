import toWord from '../util/toWord';
import {singleAnimationPlayStates} from '../validators/isSingleAnimationPlayState';

export const fixtures = {
    valid: [
        ...singleAnimationPlayStates,
        ...singleAnimationPlayStates.map(value => value.toUpperCase()),
    ],
    invalid: ['running-paused'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
