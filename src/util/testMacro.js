import cssGlobals from './globals';
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

export const valid = (t, property, value) => {
    if (Array.isArray(property)) {
        property.forEach(prop => t.is(cssValues(prop, value), true));
        return;
    }
    t.is(cssValues(property, value), true);
};

valid.title = (title, property, value) => {
    if (typeof value === 'string') {
        return `${property}: ${value} (valid)`;
    }
    return `[parsed nodes] (valid)`;
};

export const invalid = (t, property, value) => {
    if (Array.isArray(property)) {
        property.forEach(prop => t.is(cssValues(prop, value), false));
        return;
    }
    t.is(cssValues(property, value), false);
};

invalid.title = (title, property, value) => {
    if (typeof value === 'string') {
        return `${property}: ${value} (invalid)`;
    }
    return `[parsed nodes] (invalid)`;
};

export const globals = (t, property) => {
    cssGlobals.forEach(keyword => t.is(cssValues(property, keyword), true));
    t.is(cssValues(property, 'var(--foo)'), true);
    t.is(cssValues(property, 'VAR(--foo)'), true);
};

globals.title = (title, property) => `${property} should handle global keywords`;
