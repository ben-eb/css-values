import url from './url';
import geometryBox from './geometryBox';
import basicShape from './basicShape';

export default {
    valid: [
        ...url.valid,
        ...geometryBox.valid,
        ...basicShape.valid,
    ],
    invalid: [
        ...url.invalid,
        ...geometryBox.invalid,
        ...basicShape.invalid,
    ],
};
