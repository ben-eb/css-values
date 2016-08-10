import {boxes} from '../validators/isBox';

export default {
    valid: [
        ...boxes,
        ...boxes.map(value => value.toUpperCase()),
    ],
    invalid: ['rock-box'],
};
