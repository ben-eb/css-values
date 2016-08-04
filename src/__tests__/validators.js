import test from 'ava';
import dataValidator from '../util/dataValidator';
import * as fixtures from '../fixtures/index';
import * as validators from '../validators/index';

const validMacro   = (t, validator, input) => t.truthy(validator(input));
const invalidMacro = (t, validator, input) => t.falsy(validator(input));

Object.keys(fixtures).forEach(key => {
    const validator = validators[dataValidator(key)].default; // eslint-disable-line
    const fixture = fixtures[key].nodes; // eslint-disable-line
    fixture.valid.forEach(value => {
        test(`${value} (valid ${key})`, validMacro, validator, value);
    });
    fixture.invalid.forEach(value => {
        test(`${value} (invalid ${key})`, invalidMacro, validator, value);
    });
});
