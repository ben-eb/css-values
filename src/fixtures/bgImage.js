import image from './image';

export default {
    valid: [
        ...image.valid,
        'none',
    ],
    invalid: image.invalid,
};
