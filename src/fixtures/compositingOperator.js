import toWord from '../util/toWord';
import {compositingOperators} from '../validators/isCompositingOperator';

export const fixtures = {
    valid: [
        ...compositingOperators,
        ...compositingOperators.map(value => value.toUpperCase()),
    ],
    invalid: ['add-subtract'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
