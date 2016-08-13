import cssValues from '../index'; // eslint-disable-line

export default function macro (t, property, value, valid) {
    t.is(cssValues(property, value), valid);
}

macro.title = (title, property, value, valid) => {
    const validStr = ` (${valid ? 'valid' : 'invalid'})`;
    if (typeof value === 'string') {
        return `${property}: ${value}${validStr}`;
    }
    return `[parsed nodes]${validStr}`;
};
