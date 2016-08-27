import {sizeKeywords} from '../validators/isBgSize';

export default {
    valid: [
        '10px',
        '50%',
        '50% auto',
        'auto 10px',
        ...sizeKeywords,
        ...sizeKeywords.map(value => value.toUpperCase()),
    ],
    invalid: [
        '10px foo',
        '10 pixels',
        'awto awto',
        '10px 10px 10px 10px',
    ],
};
