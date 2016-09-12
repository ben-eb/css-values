import image from './image';
import url from './url';

export default {
    valid: [
        'image(url(mask.png), skyblue), linear-gradient(90deg, transparent, blue)',
        'none',
        ...url.valid,
        ...image.valid,
    ],
    invalid: [
        ...url.invalid,
        ...image.invalid,
        'abc',
        `${url.valid[0]}/${url.valid[0]}`,
    ],
};
