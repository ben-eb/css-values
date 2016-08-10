import {compositingOperators} from '../validators/isCompositingOperator';

export default {
    valid: [
        ...compositingOperators,
        ...compositingOperators.map(value => value.toUpperCase()),
    ],
    invalid: ['add-subtract'],
};
