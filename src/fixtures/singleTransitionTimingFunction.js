import {keywords, stepsKeywords} from '../validators/isSingleTransitionTimingFunction';

export default {
    valid: [
        ...keywords,
        ...keywords.map(value => value.toUpperCase()),
        'STEPS(1)',
        ...[
            ...stepsKeywords,
            ...stepsKeywords.map(value => value.toUpperCase()),
        ].map(val => `steps(5, ${val})`),
        'cubic-bezier(0.1, 0.7, 1.0, 0.1)',
        'CUBIC-BEZIER(0.1, 0.7, 1.0, 0.1)',
    ],
    invalid: [
        'ease-in-out-in-ease',
        'steps(1.0)',
        'steps(2.5, start)',
        'steps(2/start)',
        'steps(5, middle)',
        'cubic-bezier(0.1, red, 1.0, green)',
        'cubic-bezier(2.45, 0.6, 4, 0.1)',
        'cubic-bezier(0.3, 2.1)',
        'cubic-bezier(-1.9, 0.3, -0.2, 2.1)',
    ],
};
