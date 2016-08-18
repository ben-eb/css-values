const numberPercentageFunctions = [
    'brightness',
    'contrast',
    'grayscale',
    'invert',
    'opacity',
    'sepia',
    'saturate',
];

export default {
    valid: [
        'blur(5px)',
        ...numberPercentageFunctions.map(val => `${val}(60%)`),
        ...numberPercentageFunctions.map(val => `${val}(10)`),
        'drop-shadow(5px 5px #fff)',
        'drop-shadow(5px 5px 5px #fff)',
        'hue-rotate(90deg)',
        'blur(10px) hue-rotate(1turn)',
    ],
    invalid: [
        ...numberPercentageFunctions.map(val => `${val}(10.0.0)`),
        'drop-shadow(5px, 5px, 5px, #fff)',
        'drop-shadow(5px 5px 5px 5px #fff)',
        'drop-shadow(5 5 5 #fff)',
        'drop=shadow(5px 5px 5px yrllow)',
        'hue-rotate(90 degrees)',
        'blur(10px), hue-rotate(1turn)',
    ],
};
