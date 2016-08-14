import cssGlobals from './globals';
import cssValues from '../index'; // eslint-disable-line

export const validCI = (t, property, value) => {
    if (Array.isArray(property)) {
        property.forEach(prop => {
            t.is(cssValues(prop, value), true);
            t.is(cssValues(prop, value.toUpperCase()), true);
        });
        return;
    }
    t.is(cssValues(property, value), true);
    t.is(cssValues(property, value.toUpperCase()), true);
};

validCI.title = (title, property, value) => {
    if (typeof value === 'string') {
        return `${property}: ${value} (valid, case-insensitive)`;
    }
    return `[parsed nodes] (valid, case-insensitive)`;
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
