import toWord from '../util/toWord';
import {compositingOperators} from '../validators/isCompositingOperator';

export const fixtures = {
    valid: compositingOperators,
    invalid: ['add-subtract'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
