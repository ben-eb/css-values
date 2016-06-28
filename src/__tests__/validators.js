import test from 'ava';
import angle from '../validators/isAngle';
import integer from '../validators/isInteger';
import length from '../validators/isLength';
import negative from '../validators/isNegative';
import number from '../validators/isNumber';
import percentage from '../validators/isPercentage';
import time from '../validators/isTime';
import * as fixtures from '../fixtures';

const validators = {
    angle,
    integer,
    length,
    negative,
    number,
    percentage,
    time,
};

function validMacro (t, type, input) {
    t.truthy(validators[type](input));
}

function invalidMacro (t, type, input) {
    t.falsy(validators[type](input));
}

Object.keys(fixtures).forEach(key => {
    if (key === '__esModule') {
        return;
    }
    const fixture = fixtures[key];
    fixture.valid.forEach(value => {
        test(`${value} (valid ${key})`, validMacro, key, value);
    });
    fixture.invalid.forEach(value => {
        test(`${value} (invalid ${key})`, invalidMacro, key, value);
    });
});
