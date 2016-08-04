import test from 'ava';
import absoluteSize from '../validators/isAbsoluteSize';
import angle from '../validators/isAngle';
import attachment from '../validators/isAttachment';
import box from '../validators/isBox';
import brStyle from '../validators/isBrStyle';
import brWidth from '../validators/isBrWidth';
import compositeStyle from '../validators/isCompositeStyle';
import compositingOperator from '../validators/isCompositingOperator';
import customIdent from '../validators/isCustomIdent';
import flex from '../validators/isFlex';
import genericFamily from '../validators/isGenericFamily';
import integer from '../validators/isInteger';
import length from '../validators/isLength';
import lengthPercentage from '../validators/isLengthPercentage';
import maskingMode from '../validators/isMaskingMode';
import negative from '../validators/isNegative';
import number from '../validators/isNumber';
import numericFigureValue from '../validators/isNumericFigureValue';
import numericFractionValue from '../validators/isNumericFractionValue';
import numericSpacingValue from '../validators/isNumericSpacingValue';
import percentage from '../validators/isPercentage';
import relativeSize from '../validators/isRelativeSize';
import singleAnimationDirection from '../validators/isSingleAnimationDirection';
import singleAnimationFillMode from '../validators/isSingleAnimationFillMode';
import singleAnimationPlayState from '../validators/isSingleAnimationPlayState';
import time from '../validators/isTime';
import * as fixtures from '../fixtures';

const validators = {
    absoluteSize,
    angle,
    attachment,
    box,
    brStyle,
    brWidth,
    compositeStyle,
    compositingOperator,
    customIdent,
    flex,
    genericFamily,
    integer,
    length,
    lengthPercentage,
    maskingMode,
    negative,
    number,
    numericFigureValue,
    numericFractionValue,
    numericSpacingValue,
    percentage,
    relativeSize,
    singleAnimationDirection,
    singleAnimationFillMode,
    singleAnimationPlayState,
    time,
};

function toWord (value) {
    return {
        type: 'word',
        value,
    };
}

function validMacro (t, type, input) {
    t.truthy(validators[type](input));
}

function invalidMacro (t, type, input) {
    t.falsy(validators[type](input));
}

Object.keys(fixtures).forEach(key => {
    const fixture = fixtures[key]; // eslint-disable-line
    // All validation functions except isNegative take a node type
    if (key !== 'negative') {
        fixture.valid = fixture.valid.map(toWord);
        fixture.invalid = fixture.invalid.map(toWord);
    }
    fixture.valid.forEach(value => {
        test(`${value} (valid ${key})`, validMacro, key, value);
    });
    fixture.invalid.forEach(value => {
        test(`${value} (invalid ${key})`, invalidMacro, key, value);
    });
});
