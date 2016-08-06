import toWord from '../util/toWord';
import {numericFigureValues} from '../validators/isNumericFigureValue';

export const fixtures = {
    valid: [
        ...numericFigureValues,
        ...numericFigureValues.map(value => value.toUpperCase()),
    ],
    invalid: ['newnewstyle-nums'],
};

export const nodes = {
    valid: fixtures.valid.map(toWord),
    invalid: fixtures.invalid.map(toWord),
};
