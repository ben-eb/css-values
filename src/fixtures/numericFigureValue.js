import {numericFigureValues} from '../validators/isNumericFigureValue';

export default {
    valid: [
        ...numericFigureValues,
        ...numericFigureValues.map(value => value.toUpperCase()),
    ],
    invalid: ['newnewstyle-nums'],
};
