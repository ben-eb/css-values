import toWord from '../util/toWord';
import {singleAnimationDirections} from '../validators/isSingleAnimationDirection';

export const fixtures = {
    valid: [
        ...singleAnimationDirections,
        ...singleAnimationDirections.map(value => value.toUpperCase()),
    ],
    invalid: ['alternate-normal-reverse'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
