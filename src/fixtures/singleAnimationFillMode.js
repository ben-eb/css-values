import toWord from '../util/toWord';
import {singleAnimationFillModes} from '../validators/isSingleAnimationFillMode';

export const fixtures = {
    valid: [
        ...singleAnimationFillModes,
        ...singleAnimationFillModes.map(value => value.toUpperCase()),
    ],
    invalid: ['forwards-backwards'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
