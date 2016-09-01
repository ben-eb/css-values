import valueParser, { unit, walk } from 'postcss-value-parser';
import colors from 'css-color-names';
import endsWith from 'ends-with';

function lowercase(value) {
    return value.toLowerCase();
}

function isKeyword(_ref, values) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    if (Array.isArray(values)) {
        return ~values.map(lowercase).indexOf(lowercase(value));
    }
    return lowercase(value) === values;
}

function isFunction(node, values) {
    if (node.type !== 'function') {
        return false;
    }
    if (Array.isArray(values)) {
        return ~values.map(lowercase).indexOf(lowercase(node.value));
    }
    return lowercase(node.value) === values;
}

var isVariable = (function (node) {
  return isFunction(node, 'var');
});

function isKeywordFactory(keywords) {
    return function wrappedIsKeyword(parsed) {
        if (parsed.nodes.length === 1) {
            return isKeyword(parsed.nodes[0], keywords);
        }
        return false;
    };
}

var isUrl = (function (node) {
  return isFunction(node, 'url');
});

var isInteger = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !~value.indexOf('.') && !int.unit;
});

var isComma = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'div' && value === ',';
});

var isNumber = (function (node) {
    var value = node.value;


    if (node.type !== 'word') {
        return false;
    }

    return !isNaN(value) && !endsWith(value, '.');
});

var isPercentage = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && int.unit === '%';
});

var namedColours = Object.keys(colors);

function isRgb(node) {
    if (!isFunction(node, 'rgb')) {
        return;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && !isInteger(child) && !isPercentage(child) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 5;
}

function isRgba(node) {
    if (!isFunction(node, 'rgba')) {
        return;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && (index < 6 && !isInteger(child) && !isPercentage(child) || index > 5 && !isNumber(child)) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

function isHsl(node) {
    if (!isFunction(node, 'hsl')) {
        return;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && (index < 1 && !isNumber(child) || index > 1 && !isPercentage(child)) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 5;
}

function isHsla(node) {
    if (!isFunction(node, 'hsla')) {
        return;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && ((index === 0 || index === 6) && !isNumber(child) || (index === 2 || index === 4) && !isPercentage(child)) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

function isHex(node) {
    if (node.type !== 'word' || node.value[0] !== '#') {
        return false;
    }
    var range = node.value.slice(1);
    return ~[3, 4, 6, 8].indexOf(range.length) && !isNaN(parseInt(range, 16));
}

function isNamedColor(node) {
    return isKeyword(node, namedColours);
}

function isCurrentColor(node) {
    return isKeyword(node, 'currentcolor');
}

function isColor(node) {
    return isRgb(node) || isRgba(node) || isHsl(node) || isHsla(node) || isHex(node) || isNamedColor(node) || isCurrentColor(node);
}

var brStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

var isBrStyle = (function (node) {
    return isKeyword(node, brStyles);
});

var isSpace = (function (_ref) {
    var type = _ref.type;

    return type === 'space';
});

var angles = ['deg', 'grad', 'rad', 'turn'];

var isAngle = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && (int.number === '0' || ~angles.indexOf(int.unit));
});

var units = ['s', 'ms'];

var isTime = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && ~units.indexOf(int.unit);
});

var operators = ['+', '-', '*', '/'];
var operatorsRegExp = /[+\-\*\/]/i;

function isCalc (node) {
    if (!isFunction(node, 'calc') || !node.nodes || !node.nodes.length) {
        return false;
    }

    var valid = true;
    var lastNonSpaceValue = false;

    walk(node.nodes, function (child) {
        var type = child.type;
        var value = child.value;
        // if an expression starts with operator

        if (!lastNonSpaceValue && ~operators.indexOf(value)) {
            valid = false;
        }
        // store last non space node
        if (type !== 'space') {
            lastNonSpaceValue = value;
        }
        // only variables and () functions are allowed
        if (!isVariable(child) && type === 'function') {
            if (value.length > 0) {
                valid = false;
            }
            if (!child.nodes.length || !child.nodes) {
                valid = false;
            }
        }
        // invalidate any invalid word node
        if (type === 'word' && !isAngle(child) && !isLength(child) && !isTime(child) && !isInteger(child) && !isNumber(child) && !isPercentage(child) && operators.indexOf(value) < 0) {
            // + and - must be surrounded by spaces
            if (value.indexOf('+') > 0 || value.indexOf('-') > 0) {
                valid = false;
            }
            // expression can't endwith operator
            if (~operators.indexOf(value[value.length - 1])) {
                valid = false;
            }
            // unknown word node w/o operators is invalid
            if (!operatorsRegExp.test(value)) {
                valid = false;
            }
        }
    });
    // if an expression ends with operator
    if (~operators.indexOf(lastNonSpaceValue)) {
        valid = false;
    }

    return valid;
}

var lengths = ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'q', 'mm', 'cm', 'in', 'pt', 'pc'];

var isLength = (function (node) {
    if (isCalc(node)) {
        return true;
    }
    if (node.type !== 'word') {
        return false;
    }
    var int = unit(node.value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && (int.number === '0' || ~lengths.indexOf(int.unit));
});

var brWidths = ['thin', 'medium', 'thick'];

var isBrWidth = (function (node) {
    return isLength(node) || isKeyword(node, brWidths);
});

var attachments = ['scroll', 'fixed', 'local'];

var isAttachment = (function (node) {
    return isKeyword(node, attachments);
});

var compositeStyles = ['clear', 'copy', 'source-over', 'source-in', 'source-out', 'source-atop', 'destination-over', 'destination-in', 'destination-out', 'destination-atop', 'xor'];

var isCompositeStyle = (function (node) {
    return isKeyword(node, compositeStyles);
});

function getArguments(node) {
    return node.nodes.reduce(function (list, child) {
        if (isComma(child)) {
            list.push([]);
        } else {
            list[list.length - 1].push(child);
        }
        return list;
    }, [[]]);
}

var isLengthPercentage = (function (node) {
    return isLength(node) || isPercentage(node);
});

var left = 'left';
var center = 'center';
var right = 'right';
var top = 'top';
var bottom = 'bottom';

var horizontals = [left, right, center];
var verticals = [top, bottom, center];

function isKeywordOrVar(node, keywords) {
    return isKeyword(node, keywords) || isVariable(node);
}

function isLengthPercentageOrVar(node) {
    return isLengthPercentage(node) || isVariable(node);
}

function validateGroup(group) {
    var length = group.length;

    if (length === 1) {
        if (!isKeywordOrVar(group[0], [left, center, right, top, bottom]) && !isLengthPercentage(group[0])) {
            return false;
        }
    }
    if (length === 3) {
        if (!isSpace(group[1])) {
            return false;
        }
        if (isKeywordOrVar(group[0], horizontals) && isKeywordOrVar(group[2], verticals) || isKeywordOrVar(group[0], verticals) && isKeywordOrVar(group[2], horizontals)) {
            return true;
        }
        if (!isKeywordOrVar(group[0], horizontals) && !isLengthPercentage(group[0])) {
            return false;
        }
        if (!isKeywordOrVar(group[2], verticals) && !isLengthPercentage(group[2])) {
            return false;
        }
    }
    if (length >= 5 && length <= 7) {
        if (isKeywordOrVar(group[0], [left, right]) && isSpace(group[1]) && isLengthPercentageOrVar(group[2]) && isSpace(group[3]) && isKeywordOrVar(group[4], verticals)) {
            if (group[6] && isSpace(group[5]) && (!isLengthPercentageOrVar(group[6]) || group[4].value === center)) {
                return false;
            }
            return true;
        }
        if (isKeywordOrVar(group[0], [top, bottom]) && isSpace(group[1]) && isLengthPercentageOrVar(group[2]) && isSpace(group[3]) && isKeywordOrVar(group[4], horizontals)) {
            if (group[6] && isSpace(group[5]) && (!isLengthPercentageOrVar(group[6]) || group[4].value === center)) {
                return false;
            }
            return true;
        }
        return false;
    }
    return length < 8;
}

function isPositionFactory(repeating) {
    return function isPosition(parsed) {
        if (repeating && parsed.nodes[parsed.nodes.length - 1].type === 'div') {
            return false;
        }

        return getArguments(parsed).every(validateGroup);
    };
}

var singleValues = ['repeat-x', 'repeat-y'];

var multipleValues = ['repeat', 'space', 'round', 'no-repeat'];

var isRepeatStyle = (function (parsed) {
    var group = [];
    var valid = true;
    if (parsed.nodes[parsed.nodes.length - 1].type === 'div') {
        return false;
    }
    parsed.walk(function (node) {
        if (isKeyword(node, singleValues)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isKeyword(node, multipleValues) || isVariable(node)) {
            if (group.some(function (n) {
                return isKeyword(n, singleValues);
            }) || group.length === 2) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isComma(node)) {
            group = [];
            return false;
        } else if (!isSpace(node)) {
            valid = false;
        }
        return false;
    });
    return valid;
});

var singleAnimationDirections = ['normal', 'reverse', 'alternate', 'alternate-reverse'];

var isSingleAnimationDirection = (function (node) {
    return isKeyword(node, singleAnimationDirections);
});

var singleAnimationFillModes = ['none', 'forwards', 'backwards', 'both'];

var isSingleAnimationFillMode = (function (node) {
    return isKeyword(node, singleAnimationFillModes);
});

var value = ['infinite'];

var isSingleAnimationIterationCount = (function (node) {
    return isKeyword(node, value) || isNumber(node);
});

function isInvalid(value) {
    return (/[^a-z0-9_-]/ig.test(value)
    );
}

function isCodepoint(value) {
    return (/\\u[a-f0-9]{1,6}/ig.test(value) || /\\[a-f0-9]{1,6}/ig.test(value)
    );
}

function isValid(value) {
    return !isInvalid(value) || isCodepoint(value);
}

var isCustomIdent = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    if (value[0] === '-') {
        if (/[0-9]/.test(value[1])) {
            return false;
        }
        if (value[1] === '-' && value[2] !== '-') {
            return false;
        }
        return isValid(value);
    }
    return !/[0-9]/.test(value[0]) && isValid(value);
});

var isSingleAnimationName = (function (node) {
    return isKeyword(node, 'none') || isCustomIdent(node);
});

var singleAnimationPlayStates = ['running', 'paused'];

var isSingleAnimationPlayState = (function (node) {
    return isKeyword(node, singleAnimationPlayStates);
});

var keywords = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];

var stepsKeywords = ['start', 'end'];

function isTimingKeyword(node) {
    return isKeyword(node, keywords);
}

function isSteps(node) {
    if (!isFunction(node, 'steps') || !isInteger(node.nodes[0])) {
        return false;
    }
    var one = node.nodes[1];
    var two = node.nodes[2];
    if (one && !isComma(one)) {
        return false;
    }
    if (two) {
        return isKeyword(two, stepsKeywords);
    }
    return true;
}

function isValidAbscissa(_ref) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'word' && value >= 0 && value <= 1;
}

function isCubicBezier(node) {
    if (!isFunction(node, 'cubic-bezier')) {
        return false;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && ((index === 0 || index === 4) && !isValidAbscissa(child) || (index === 2 || index === 6) && !isNumber(child)) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid && node.nodes.length === 7;
}

var isSingleTransitionTimingFunction = (function (node) {
    return isTimingKeyword(node) || isSteps(node) || isCubicBezier(node);
});

var numberPercentages = ['brightness', 'contrast', 'grayscale', 'invert', 'opacity', 'sepia', 'saturate'];

function isNumberOrPercentage(node) {
    if (!isFunction(node, numberPercentages)) {
        return false;
    }
    var nodes = node.nodes;

    return nodes.length === 1 && (isNumber(nodes[0]) || isPercentage(nodes[0]));
}

function isBlur(node) {
    if (!isFunction(node, 'blur')) {
        return false;
    }
    var nodes = node.nodes;

    return nodes.length === 1 && isLength(nodes[0]);
}

function isDropShadow(node) {
    if (!isFunction(node, 'drop-shadow')) {
        return false;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && index <= 2 && !isLength(child)) {
            valid = false;
            return false;
        }
        if (even && index === 4 && !isLength(child) && !isColor(child)) {
            valid = false;
            return false;
        }
        if (even && index === 6 && !isColor(child)) {
            valid = false;
            return false;
        }
        if (!even && !isSpace(child)) {
            valid = false;
            return false;
        }
    });
    return valid && node.nodes.length <= 7;
}

function isHueRotate(node) {
    if (!isFunction(node, 'hue-rotate')) {
        return false;
    }
    var nodes = node.nodes;

    return nodes.length === 1 && isAngle(nodes[0]);
}

function isFilterFunction(node) {
    return isBlur(node) || isDropShadow(node) || isHueRotate(node) || isNumberOrPercentage(node);
}

function isFilterFunctionList(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
        var even = index % 2 === 0;
        if (even && !isFilterFunction(node) && !isVariable(node)) {
            valid = false;
        }
        if (!even && !isSpace(node)) {
            valid = false;
        }
        return false;
    });
    return valid;
}

var blendValues = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

var isBlendMode = (function (node) {
    return isKeyword(node, blendValues);
});

var boxes = ['border-box', 'padding-box', 'content-box'];

var isBox = (function (node) {
    return isKeyword(node, boxes);
});

var resolutions = ['dpi', 'dpcm', 'dppx'];

function isResolution(_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && ~resolutions.indexOf(int.unit);
};

var isString = (function (_ref) {
  var type = _ref.type;
  return type === 'string';
});

function isMultiplier(_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && int.unit === 'x';
};

function isImageFunction(node) {
    if (!isFunction(node, 'image')) {
        return false;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        if (index === 0 && !isImage(child) && !isString(child) && !isColor(child)) {
            valid = false;
        }
        if (index === 1 && !isComma(child)) {
            valid = false;
        }
        if (index === 2 && (isColor(node.nodes[0]) || !isColor(child))) {
            valid = false;
        }
        return false;
    });
    return valid && node.nodes.length <= 3;
}

function validateImageSet(group) {
    if (!isImage(group[0]) && !isString(group[0]) || isFunction(group[0], 'image-set') || !group[2] || !isResolution(group[2]) && !isMultiplier(group[2])) {
        return false;
    }
    return group.length === 3;
}

function isImageSet(node) {
    if (!isFunction(node, 'image-set')) {
        return false;
    }
    return getArguments(node).every(validateImageSet);
}

function isIdSelector(_ref2) {
    var type = _ref2.type;
    var value = _ref2.value;

    if (type !== 'word') {
        return false;
    }
    return value[0] === '#' && isCustomIdent({ type: 'word', value: value.slice(1) });
}

function isElement(node) {
    if (!isFunction(node, 'element')) {
        return false;
    }
    if (node.nodes.length !== 1) {
        return false;
    }
    return isIdSelector(node.nodes[0]);
}

function isCrossFade(node) {
    if (!isFunction(node, 'cross-fade')) {
        return false;
    }
    var valid = true;
    walk(node.nodes, function (child, index) {
        if (index === 0 && !isPercentage(child) && !isImage(child)) {
            valid = false;
        }
        if (index === 2 && !isPercentage(child) && !isImage(child)) {
            valid = false;
        }
        if (index === 4 && !isImage(child) && !isColor(child)) {
            valid = false;
        }
        return false;
    });
    return valid;
}

function isColourStop(group) {
    var length = group.length;

    if (length === 1) {
        return isColor(group[0]);
    }
    if (length === 3) {
        return isColor(group[0]) && isLengthPercentage(group[2]);
    }
    return false;
}

var top$1 = 'top';
var right$1 = 'right';
var bottom$1 = 'bottom';
var left$1 = 'left';

var verticals$1 = [top$1, bottom$1];
var horizontals$1 = [right$1, left$1];
var directions = [].concat(horizontals$1, verticals$1);

function isLinearGradient(node) {
    if (!isFunction(node, ['linear-gradient', 'repeating-linear-gradient'])) {
        return false;
    }
    var colours = 0;
    var valid = getArguments(node).every(function (group, index) {
        if (index === 0) {
            var length = group.length;

            if (length === 1 && isAngle(group[0])) {
                return true;
            }
            if (length > 1 && group[0].value === 'to' && length <= 5) {
                return !group[4] && isKeyword(group[2], directions) || isKeyword(group[2], horizontals$1) && isKeyword(group[4], verticals$1) || isKeyword(group[2], verticals$1) && isKeyword(group[4], horizontals$1);
            }
        }
        var colour = isColourStop(group);
        if (colour) {
            colours++;
        }
        return colour;
    });
    return valid && colours > 1;
}

var at = 'at';
var circle = 'circle';
var ellipse = 'ellipse';
var endingShapes = [circle, ellipse];

var extentKeywords = ['closest-corner', 'closest-side', 'farthest-corner', 'farthest-side'];

var isRadialGradientPosition = isPositionFactory(false);

function isAt(_ref3) {
    var value = _ref3.value;

    return value === at;
}

function isRadialGradient(node) {
    if (!isFunction(node, ['radial-gradient', 'repeating-radial-gradient'])) {
        return false;
    }
    var colours = 0;
    var valid = getArguments(node).every(function (group, index) {
        if (index === 0) {
            var length = group.length;

            var firstIsEndingShape = isKeyword(group[0], endingShapes);
            var firstIsLength = isLength(group[0]);
            var firstIsExtent = isKeyword(group[0], extentKeywords);
            if (length === 1 && (firstIsEndingShape || firstIsLength || firstIsExtent)) {
                return true;
            }
            var position2 = isRadialGradientPosition({ nodes: group.slice(2) });
            if (isAt(group[0]) && position2) {
                return true;
            }
            var firstIsCircle = group[0].value === circle;
            var secondIsExtent = group[2] && isKeyword(group[2], extentKeywords);
            var secondIsEndingShape = group[2] && isKeyword(group[2], endingShapes);
            if (length === 3 && (firstIsCircle && isLength(group[2]) || firstIsLength && group[2].value === circle || firstIsExtent && secondIsEndingShape || firstIsEndingShape && secondIsExtent)) {
                return true;
            }
            var firstIsEllipse = group[0].value === ellipse;
            var firstIsLP = isLengthPercentage(group[0]);
            var secondIsLP = group[2] && isLengthPercentage(group[2]);
            var thirdIsLP = group[4] && isLengthPercentage(group[4]);
            var position4 = isRadialGradientPosition({ nodes: group.slice(4) });
            var position6 = isRadialGradientPosition({ nodes: group.slice(6) });
            var position8 = isRadialGradientPosition({ nodes: group.slice(8) });
            if (length === 5 && (firstIsEllipse && secondIsLP && thirdIsLP || firstIsLP && secondIsLP && group[4].value === ellipse)) {
                return true;
            }
            if (length > 3 && (firstIsEndingShape && isAt(group[2]) && position4 || firstIsExtent && isAt(group[2]) && position4 || firstIsLength && isAt(group[2]) && position4 || firstIsLP && secondIsLP && isAt(group[4]) && position6 || firstIsCircle && isLength(group[2]) && isAt(group[4]) && position6 || firstIsEndingShape && secondIsExtent && isAt(group[4]) && position6 || firstIsExtent && secondIsEndingShape && isAt(group[4]) && position6 || firstIsEllipse && secondIsLP && thirdIsLP && isAt(group[6]) && position8 || firstIsLP && secondIsLP && group[4].value === ellipse && isAt(group[6]) && position8)) {
                return true;
            }
        }
        var colour = isColourStop(group);
        if (colour) {
            colours++;
        }
        return colour;
    });
    return valid && colours > 1;
}

function isGradient(node) {
    return isLinearGradient(node) || isRadialGradient(node);
}

function isImage(node) {
    return isUrl(node) || isImageFunction(node) || isImageSet(node) || isElement(node) || isCrossFade(node) || isGradient(node);
}

function isBgImage(node) {
    return isImage(node) || isKeyword(node, 'none');
}

var sizeKeywords = ['cover', 'contain'];

var auto = 'auto';

function validateNode(node) {
    return isKeyword(node, auto) || isLengthPercentage(node) || isVariable(node);
}

function validateGroup$1(group) {
    var length = group.length;

    if (length && length < 4) {
        if (!validateNode(group[0])) {
            return false;
        }
        if (group[2] && !validateNode(group[2])) {
            return false;
        }
        return true;
    }
    return false;
}

function isBgSize(parsed) {
    if (parsed.nodes.length === 1 && isKeyword(parsed.nodes[0], sizeKeywords)) {
        return true;
    }

    return getArguments(parsed).every(validateGroup$1);
}

var absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

var isAbsoluteSize = (function (node) {
    return isKeyword(node, absoluteSizes);
});

var relativeSizes = ['larger', 'smaller'];

var isRelativeSize = (function (node) {
    return isKeyword(node, relativeSizes);
});

var isNegative = (function (num) {
    return num < 0;
});

var isFlex = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && int.unit === 'fr' && !isNegative(int.number);
});

var isMinMax = (function (node) {
    if (isFunction(node, 'minmax') && node.nodes.length === 3) {

        var firstChild = node.nodes[0];
        var secondChild = node.nodes[1];
        var thirdChild = node.nodes[2];

        if (!isKeyword(firstChild, keywords$1) && !isLengthPercentage(firstChild)) {
            return false;
        }

        if (!isComma(secondChild)) {
            return false;
        }

        if (!isKeyword(thirdChild, keywords$1) && !isLengthPercentage(thirdChild) && !isFlex(thirdChild)) {
            return false;
        }

        return true;
    }

    return false;
});

var keywords$1 = ['min-content', 'max-content', 'auto'];

var isTrackSize = (function (node) {
    return isMinMax(node) || isFlex(node) || isLengthPercentage(node) || isKeyword(node, keywords$1);
});

var standard = ['disc', 'circle', 'square', 'decimal', 'cjk-decimal', 'decimal-leading-zero', 'lower-roman', 'upper-roman', 'lower-greek', 'lower-alpha', 'lower-latin', 'upper-alpha', 'upper-latin', 'arabic-indic', '-moz-arabic-indic', 'armenian', 'bengali', '-moz-bengali', 'cambodian', 'cjk-earthly-branch', '-moz-cjk-earthly-branch', 'cjk-heavenly-stem', '-moz-cjk-heavenly-stem', 'cjk-ideographic', 'devanagari', '-moz-devanagari', 'ethiopic-numeric', 'georgian', 'gujarati', '-moz-gujarati', 'gurmukhi', '-moz-gurmukhi', 'hebrew', 'hiragana', 'hiragana-iroha', 'japanese-formal', 'japanese-informal', 'kannada', '-moz-kannada', 'katakana', 'katakana-iroha', 'khmer', '-moz-khmer', 'korean-hangul-formal', 'korean-hanja-formal', 'korean-hanja-informal', 'lao', '-moz-lao', 'lower-armenian', 'malayalam', '-moz-malayalam', 'mongolian', 'myanmar', '-moz-myanmar', 'oriya', '-moz-oriya', 'persian', '-moz-persian', 'simp-chinese-formal', 'simp-chinese-informal', 'tamil', '-moz-tamil', 'telugu', '-moz-telugu', 'thai', '-moz-thai', 'tibetan', 'trad-chinese-formal', 'trad-chinese-informal', 'upper-armenian', 'disclosure-open', 'disclosure-closed'];

var nonStandard = ['-moz-ethiopic-halehame', '-moz-ethiopic-halehame-am', 'ethiopic-halehame-ti-er', '-moz-ethiopic-halehame-ti-er', 'ethiopic-halehame-ti-et', '-moz-ethiopic-halehame-ti-et', 'hangul', '-moz-hangul', 'hangul-consonant', '-moz-hangul-consonant', 'urdu', '-moz-urdu'];

var valid = [].concat(standard, nonStandard);

var symbolTypes = ['cyclic', 'numeric', 'alphabetic', 'symbolic', 'fixed'];

function isSymbols(node) {
    if (!isFunction(node, 'symbols')) {
        return false;
    }
    var validSym = true;
    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && (index === 0 && !isKeyword(child, symbolTypes) && !isString(child) && !isImage(child) || index > 1 && !isString(child) && !isImage(child)) || !even && !isSpace(child)) {
            validSym = false;
        }
        return false;
    });
    return validSym;
}

function isCounterStyle(node) {
    return isCustomIdent(node) || isKeyword(node, valid) || isSymbols(node);
}

var compositingOperators = ['add', 'subtract', 'intersect', 'exclude'];

var isCompositingOperator = (function (node) {
    return isKeyword(node, compositingOperators);
});

var maskingModes = ['alpha', 'luminance', 'match-source'];

var isMaskingMode = (function (node) {
    return isKeyword(node, maskingModes);
});

var geometryBoxes = ['margin-box', 'fill-box', 'stroke-box', 'view-box'];

var nonStandardKeywords = ['content', 'padding', 'border'];

var isGeometryBox = (function (node) {
    return isBox(node) || isKeyword(node, geometryBoxes) || isKeyword(node, nonStandardKeywords);
});

function validateShadow(nodes) {
    var hasColor = false;
    var hasLength = 0;
    var hasVariable = false;
    var startsWithLength = false;
    var valid = true;

    walk(nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even) {
            if (isLength(child)) {
                if (!index) {
                    startsWithLength = true;
                }
                if (hasLength && hasColor && startsWithLength) {
                    valid = false;
                    return false;
                }
                hasLength++;
                if (hasLength > 3) {
                    valid = false;
                }
            } else if (isColor(child)) {
                if (hasColor) {
                    valid = false;
                } else {
                    hasColor = true;
                }
            } else if (isVariable(child)) {
                hasVariable = true;
            } else {
                valid = false;
            }
        } else if (!even && !isSpace(child)) {
            valid = false;
        }

        return false;
    });

    if (!hasVariable && hasLength < 2 || nodes.length > 7) {
        return false;
    }

    return valid;
}

function isShadowT(parsed) {
    return getArguments(parsed).every(validateShadow);
}

var matrix = 'matrix';
var matrix3d = 'matrix3d';

function isMatrix(node) {
    if (!isFunction(node, [matrix, matrix3d])) {
        return false;
    }
    if (node.value === matrix && node.nodes.length !== 11 || node.value === matrix3d && node.nodes.length !== 31) {
        return false;
    }

    var valid = true;

    walk(node.nodes, function (child, index) {
        var even = index % 2 === 0;
        if (even && !isNumber(child) || !even && !isComma(child)) {
            valid = false;
        }
        return false;
    });

    return valid;
}

function isMultipleValue(name, fn) {
    return function (node) {
        if (!isFunction(node, name)) {
            return false;
        }
        if (node.nodes.length > 3) {
            return false;
        }

        var valid = true;

        walk(node.nodes, function (child, index) {
            var even = index % 2 === 0;
            if (even && !fn(child) || !even && !isComma(child)) {
                valid = false;
            }
            return false;
        });

        if (isComma(node.nodes[node.nodes.length - 1])) {
            return false;
        }
        return valid;
    };
}

var isTranslate = isMultipleValue('translate', isLengthPercentage);
var isScale = isMultipleValue('scale', isNumber);
var isSkew = isMultipleValue('skew', isAngle);

var singleNumbers = ['scaleX', 'scaleY', 'scaleZ'];

var singleAngles = ['rotate', 'skewX', 'skewY', 'rotateX', 'rotateY', 'rotateZ'];

var singleLengths = ['perspective', 'translateZ'];

var singleLPs = ['translateX', 'translateY'];

function isSingleValidator(name, fn) {
    return function (node) {
        if (!isFunction(node, name)) {
            return false;
        }
        if (node.nodes.length !== 1) {
            return false;
        }
        return fn(node.nodes[0]);
    };
}

var isSingleLP = isSingleValidator(singleLPs, isLengthPercentage);
var isSingleNumber = isSingleValidator(singleNumbers, isNumber);
var isSingleAngle = isSingleValidator(singleAngles, isAngle);
var isSingleLength = isSingleValidator(singleLengths, isLength);

function isTranslate3d(node) {
    if (!isFunction(node, 'translate3d')) {
        return false;
    }
    var nodes = node.nodes;

    if (nodes.length !== 5) {
        return false;
    }
    return isLengthPercentage(nodes[0]) && isComma(nodes[1]) && isLengthPercentage(nodes[2]) && isComma(nodes[3]) && isLength(nodes[4]);
}

function isScale3d(node) {
    if (!isFunction(node, 'scale3d')) {
        return false;
    }
    var nodes = node.nodes;

    if (nodes.length !== 5) {
        return false;
    }
    return isNumber(nodes[0]) && isComma(nodes[1]) && isNumber(nodes[2]) && isComma(nodes[3]) && isNumber(nodes[4]);
}

function isRotate3d(node) {
    if (!isFunction(node, 'rotate3d')) {
        return false;
    }
    var nodes = node.nodes;

    if (nodes.length !== 7) {
        return false;
    }
    return isNumber(nodes[0]) && isComma(nodes[1]) && isNumber(nodes[2]) && isComma(nodes[3]) && isNumber(nodes[4]) && isComma(nodes[5]) && isAngle(nodes[6]);
}

function validateNode$1(node) {
    return isMatrix(node) || isRotate3d(node) || isScale(node) || isScale3d(node) || isSkew(node) || isSingleAngle(node) || isSingleLength(node) || isSingleLP(node) || isSingleNumber(node) || isTranslate(node) || isTranslate3d(node) || isVariable(node);
}

function isTransformList(parsed) {
    var valid = true;

    parsed.walk(function (node, index) {
        var even = index % 2 === 0;
        if (even && !validateNode$1(node) || !even && !isSpace(node)) {
            valid = false;
        }
        return false;
    });

    return valid;
}

var animateableFeatures = ['scroll-position', 'contents'];

var isAnimateableFeature = (function (node) {
    return isKeyword(node, animateableFeatures) || isCustomIdent(node);
});

function invalidMessage(message) {
    return {
        type: 'invalid',
        message: message
    };
}

function unknownMessage(message) {
    return {
        type: 'unknown',
        message: message
    };
}

var msOverflowStyleValidator = isKeywordFactory(["auto", "none", "scrollbar", "-ms-autohiding-scrollbar"]);
var mozAppearanceValidator = isKeywordFactory(["none", "button", "button-arrow-down", "button-arrow-next", "button-arrow-previous", "button-arrow-up", "button-bevel", "button-focus", "caret", "checkbox", "checkbox-container", "checkbox-label", "checkmenuitem", "dualbutton", "groupbox", "listbox", "listitem", "menuarrow", "menubar", "menucheckbox", "menuimage", "menuitem", "menuitemtext", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menupopup", "menuradio", "menuseparator", "meterbar", "meterchunk", "progressbar", "progressbar-vertical", "progresschunk", "progresschunk-vertical", "radio", "radio-container", "radio-label", "radiomenuitem", "range", "range-thumb", "resizer", "resizerpanel", "scale-horizontal", "scalethumbend", "scalethumb-horizontal", "scalethumbstart", "scalethumbtick", "scalethumb-vertical", "scale-vertical", "scrollbarbutton-down", "scrollbarbutton-left", "scrollbarbutton-right", "scrollbarbutton-up", "scrollbarthumb-horizontal", "scrollbarthumb-vertical", "scrollbartrack-horizontal", "scrollbartrack-vertical", "searchfield", "separator", "sheet", "spinner", "spinner-downbutton", "spinner-textfield", "spinner-upbutton", "splitter", "statusbar", "statusbarpanel", "tab", "tabpanel", "tabpanels", "tab-scroll-arrow-back", "tab-scroll-arrow-forward", "textfield", "textfield-multiline", "toolbar", "toolbarbutton", "toolbarbutton-dropdown", "toolbargripper", "toolbox", "tooltip", "treeheader", "treeheadercell", "treeheadersortarrow", "treeitem", "treeline", "treetwisty", "treetwistyopen", "treeview", "-moz-mac-unified-toolbar", "-moz-win-borderless-glass", "-moz-win-browsertabbar-toolbox", "-moz-win-communicationstext", "-moz-win-communications-toolbox", "-moz-win-exclude-glass", "-moz-win-glass", "-moz-win-mediatext", "-moz-win-media-toolbox", "-moz-window-button-box", "-moz-window-button-box-maximized", "-moz-window-button-close", "-moz-window-button-maximize", "-moz-window-button-minimize", "-moz-window-button-restore", "-moz-window-frame-bottom", "-moz-window-frame-left", "-moz-window-frame-right", "-moz-window-titlebar", "-moz-window-titlebar-maximized"]);

var mozBindingValidator = function mozBindingValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isUrl(node) || isKeyword(node, "none");
  }

  return false;
};

var mozFloatEdgeValidator = isKeywordFactory(["border-box", "content-box", "margin-box", "padding-box"]);

var mozForceBrokenImageIconValidator = function mozForceBrokenImageIconValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node);
  }

  return false;
};

var mozOrientValidator = isKeywordFactory(["inline", "block", "horizontal", "vertical"]);
var mozStackSizingValidator = isKeywordFactory(["ignore", "stretch-to-fit"]);
var mozTextBlinkValidator = isKeywordFactory(["none", "blink"]);
var mozUserFocusValidator = isKeywordFactory(["ignore", "normal", "select-after", "select-before", "select-menu", "select-same", "select-all", "none"]);
var mozUserInputValidator = isKeywordFactory(["none", "enabled", "disabled"]);
var mozUserModifyValidator = isKeywordFactory(["read-only", "read-write", "write-only"]);
var mozWindowShadowValidator = isKeywordFactory(["default", "menu", "tooltip", "sheet", "none"]);

var webkitBorderBeforeColorValidator = function webkitBorderBeforeColorValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isColor(node);
  }

  return false;
};

var webkitBorderBeforeStyleValidator = function webkitBorderBeforeStyleValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBrStyle(node) && !isVariable(node) || !even && !isSpace(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
};

var webkitBorderBeforeWidthValidator = function webkitBorderBeforeWidthValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBrWidth(node) && !isVariable(node) || !even && !isSpace(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
};

var webkitMaskAttachmentValidator = function webkitMaskAttachmentValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isAttachment(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var webkitMaskCompositeValidator = function webkitMaskCompositeValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isCompositeStyle(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var webkitMaskPositionValidator = isPositionFactory(true);
var webkitMaskRepeatValidator = isRepeatStyle;
var webkitMaskRepeatXValidator = isKeywordFactory(["repeat", "no-repeat", "space", "round"]);

var webkitTapHighlightColorValidator = function webkitTapHighlightColorValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isColor(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var webkitTextStrokeWidthValidator = function webkitTextStrokeWidthValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node);
  }

  return false;
};

var webkitTouchCalloutValidator = isKeywordFactory(["default", "none"]);
var alignContentValidator = isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"]);
var msFlexLinePackValidator = isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "stretch", "start", "end", "justify", "distribute"]);
var msFlexAlignValidator = isKeywordFactory(["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"]);
var alignItemsValidator = isKeywordFactory(["flex-start", "flex-end", "center", "baseline", "stretch"]);
var alignSelfValidator = isKeywordFactory(["auto", "flex-start", "flex-end", "center", "baseline", "stretch"]);
var msFlexItemAlignValidator = isKeywordFactory(["auto", "flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"]);
var allValidator = isKeywordFactory(["initial", "inherit", "unset"]);

var animationDelayValidator = function animationDelayValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isTime(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationDirectionValidator = function animationDirectionValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationDirection(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationFillModeValidator = function animationFillModeValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationFillMode(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationIterationCountValidator = function animationIterationCountValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationIterationCount(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationNameValidator = function animationNameValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationName(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationPlayStateValidator = function animationPlayStateValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationPlayState(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var animationTimingFunctionValidator = function animationTimingFunctionValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleTransitionTimingFunction(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var appearanceValidator = isKeywordFactory(["auto", "none"]);

var backdropFilterValidator = function backdropFilterValidator(parsed) {
  if (isFilterFunctionList(parsed)) {
    return true;
  }

  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isKeyword(node, "none");
  }

  return false;
};

var backfaceVisibilityValidator = isKeywordFactory(["visible", "hidden"]);

var backgroundBlendModeValidator = function backgroundBlendModeValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBlendMode(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var backgroundClipValidator = function backgroundClipValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBox(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var backgroundImageValidator = function backgroundImageValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBgImage(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var backgroundSizeValidator = isBgSize;

var borderBottomLeftRadiusValidator = function borderBottomLeftRadiusValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isLengthPercentage(node) && !isVariable(node) || !even && !isSpace(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 3;
};

var borderBottomStyleValidator = function borderBottomStyleValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrStyle(node);
  }

  return false;
};

var borderBottomWidthValidator = function borderBottomWidthValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrWidth(node);
  }

  return false;
};

var borderCollapseValidator = isKeywordFactory(["collapse", "separate"]);

var borderColorValidator = function borderColorValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isColor(node) && !isVariable(node) || !even && !isSpace(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
};

var borderImageSourceValidator = function borderImageSourceValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isImage(node) || isKeyword(node, "none");
  }

  return false;
};

var bottomValidator = function bottomValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node) || isKeyword(node, "auto");
  }

  return false;
};

var boxAlignValidator = isKeywordFactory(["start", "center", "end", "baseline", "stretch"]);
var boxDecorationBreakValidator = isKeywordFactory(["slice", "clone"]);
var boxDirectionValidator = isKeywordFactory(["normal", "reverse", "inherit"]);

var boxFlexValidator = function boxFlexValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node);
  }

  return false;
};

var boxLinesValidator = isKeywordFactory(["single", "multiple"]);
var boxOrientValidator = isKeywordFactory(["horizontal", "vertical", "inline-axis", "block-axis", "inherit"]);
var boxPackValidator = isKeywordFactory(["start", "center", "end", "justify"]);
var boxSizingValidator = isKeywordFactory(["content-box", "border-box"]);
var boxSuppressValidator = isKeywordFactory(["show", "discard", "hide"]);
var pageBreakAfterValidator = isKeywordFactory(["auto", "always", "avoid", "left", "right"]);
var webkitColumnBreakInsideValidator = isKeywordFactory(["auto", "avoid", "avoid-page", "avoid-column", "avoid-region"]);
var captionSideValidator = isKeywordFactory(["top", "bottom", "block-start", "block-end", "inline-start", "inline-end"]);
var clearValidator = isKeywordFactory(["none", "left", "right", "both", "inline-start", "inline-end"]);

var columnCountValidator = function columnCountValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || isKeyword(node, "auto");
  }

  return false;
};

var columnFillValidator = isKeywordFactory(["auto", "balance"]);

var columnGapValidator = function columnGapValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isKeyword(node, "normal");
  }

  return false;
};

var columnSpanValidator = isKeywordFactory(["none", "all"]);

var columnWidthValidator = function columnWidthValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isKeyword(node, "auto");
  }

  return false;
};

var directionValidator = isKeywordFactory(["ltr", "rtl"]);
var displayValidator = isKeywordFactory(["none", "inline", "block", "list-item", "inline-list-item", "inline-block", "inline-table", "table", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "flex", "inline-flex", "grid", "inline-grid", "run-in", "ruby", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container", "contents", "-webkit-box", "-webkit-flex", "-moz-box", "-ms-flexbox", "-webkit-inline-box", "-webkit-inline-flex", "-moz-inline-box", "-ms-inline-flexbox", "-ms-grid", "-ms-inline-grid"]);
var displayInsideValidator = isKeywordFactory(["auto", "block", "table", "flex", "grid", "ruby"]);
var displayListValidator = isKeywordFactory(["none", "list-item"]);
var displayOutsideValidator = isKeywordFactory(["block-level", "inline-level", "run-in", "contents", "none", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-cell", "table-column-group", "table-column", "table-caption", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container"]);
var emptyCellsValidator = isKeywordFactory(["show", "hide"]);
var mozBoxOrientValidator = isKeywordFactory(["row", "row-reverse", "column", "column-reverse", "horizontal", "vertical"]);
var mozBoxDirectionValidator = isKeywordFactory(["row", "row-reverse", "column", "column-reverse", "normal", "reverse"]);
var flexDirectionValidator = isKeywordFactory(["row", "row-reverse", "column", "column-reverse"]);
var flexWrapValidator = isKeywordFactory(["nowrap", "wrap", "wrap-reverse"]);
var floatValidator = isKeywordFactory(["left", "right", "none", "inline-start", "inline-end"]);
var fontKerningValidator = isKeywordFactory(["auto", "normal", "none"]);

var fontLanguageOverrideValidator = function fontLanguageOverrideValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isString(node) || isKeyword(node, "normal");
  }

  return false;
};

var fontSizeValidator = function fontSizeValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isAbsoluteSize(node) || isRelativeSize(node) || isLengthPercentage(node);
  }

  return false;
};

var fontSizeAdjustValidator = function fontSizeAdjustValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || isKeyword(node, "none");
  }

  return false;
};

var fontStretchValidator = isKeywordFactory(["normal", "ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"]);
var fontStyleValidator = isKeywordFactory(["normal", "italic", "oblique"]);
var fontVariantCapsValidator = isKeywordFactory(["normal", "small-caps", "all-small-caps", "petite-caps", "all-petite-caps", "unicase", "titling-caps"]);
var fontVariantPositionValidator = isKeywordFactory(["normal", "sub", "super"]);
var fontWeightValidator = isKeywordFactory(["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"]);

var gridAutoColumnsValidator = function gridAutoColumnsValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isTrackSize(node);
  }

  return false;
};

var gridColumnGapValidator = function gridColumnGapValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node);
  }

  return false;
};

var gridTemplateAreasValidator = function gridTemplateAreasValidator(parsed) {
  var node = parsed.nodes[0];

  if (parsed.nodes.length === 1 && isKeyword(node, "none")) {
    return true;
  }

  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isString(node) && !isVariable(node) || !even && !isSpace(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var hyphensValidator = isKeywordFactory(["none", "manual", "auto"]);
var imageRenderingValidator = isKeywordFactory(["auto", "crisp-edges", "pixelated", "-webkit-optimize-contrast", "-moz-crisp-edges", "-o-pixelated"]);
var msInterpolationModeValidator = isKeywordFactory(["auto", "crisp-edges", "pixelated", "nearest-neighbor"]);
var imeModeValidator = isKeywordFactory(["auto", "normal", "active", "inactive", "disabled"]);
var initialLetterAlignValidator = isKeywordFactory(["auto", "alphabetic", "hanging", "ideographic"]);
var isolationValidator = isKeywordFactory(["auto", "isolate"]);
var mozBoxPackValidator = isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify"]);
var justifyContentValidator = isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around"]);
var msFlexPackValidator = isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify", "distribute"]);

var letterSpacingValidator = function letterSpacingValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isKeyword(node, "normal");
  }

  return false;
};

var lineBreakValidator = isKeywordFactory(["auto", "loose", "normal", "strict"]);

var lineHeightValidator = function lineHeightValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || isLengthPercentage(node) || isKeyword(node, "normal");
  }

  return false;
};

var listStylePositionValidator = isKeywordFactory(["inside", "outside"]);

var listStyleTypeValidator = function listStyleTypeValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCounterStyle(node) || isString(node) || isKeyword(node, "none");
  }

  return false;
};

var maskCompositeValidator = function maskCompositeValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isCompositingOperator(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var maskModeValidator = function maskModeValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isMaskingMode(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var maskOriginValidator = function maskOriginValidator(parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isGeometryBox(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var maskTypeValidator = isKeywordFactory(["luminance", "alpha"]);
var maxBlockSizeValidatorKeywords = ["none", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];

var maxBlockSizeValidator = function maxBlockSizeValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node) || isKeyword(node, maxBlockSizeValidatorKeywords);
  }

  return false;
};

var mixBlendModeValidator = function mixBlendModeValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBlendMode(node);
  }

  return false;
};

var objectFitValidator = isKeywordFactory(["fill", "contain", "cover", "none", "scale-down"]);
var objectPositionValidator = isPositionFactory(false);

var outlineColorValidator = function outlineColorValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isColor(node) || isKeyword(node, "invert");
  }

  return false;
};

var outlineStyleValidator = function outlineStyleValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrStyle(node) || isKeyword(node, "auto");
  }

  return false;
};

var overflowValidator = isKeywordFactory(["visible", "hidden", "scroll", "auto"]);
var overflowClipBoxValidator = isKeywordFactory(["padding-box", "content-box"]);
var overflowWrapValidator = isKeywordFactory(["normal", "break-word"]);
var pageBreakInsideValidator = isKeywordFactory(["auto", "avoid"]);

var perspectiveValidator = function perspectiveValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isKeyword(node, "none");
  }

  return false;
};

var pointerEventsValidator = isKeywordFactory(["auto", "none", "visiblePainted", "visibleFill", "visibleStroke", "visible", "painted", "fill", "stroke", "all", "inherit"]);
var positionValidator = isKeywordFactory(["static", "relative", "absolute", "sticky", "fixed", "-webkit-sticky"]);
var resizeValidator = isKeywordFactory(["none", "both", "horizontal", "vertical"]);
var rubyAlignValidator = isKeywordFactory(["start", "center", "space-between", "space-around"]);
var rubyMergeValidator = isKeywordFactory(["separate", "collapse", "auto"]);
var rubyPositionValidator = isKeywordFactory(["over", "under", "inter-character"]);
var scrollBehaviorValidator = isKeywordFactory(["auto", "smooth"]);

var scrollSnapCoordinateValidator = function scrollSnapCoordinateValidator(parsed) {
  if (isPositionFactory(true)(parsed)) {
    return true;
  }

  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isKeyword(node, "none");
  }

  return false;
};

var scrollSnapTypeValidator = isKeywordFactory(["none", "mandatory", "proximity"]);

var tabSizeValidator = function tabSizeValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node) || isLength(node);
  }

  return false;
};

var tableLayoutValidator = isKeywordFactory(["auto", "fixed"]);
var textAlignValidator = isKeywordFactory(["start", "end", "left", "right", "center", "justify", "match-parent"]);
var textAlignLastValidator = isKeywordFactory(["auto", "start", "end", "left", "right", "center", "justify"]);
var textDecorationStyleValidator = isKeywordFactory(["solid", "double", "dotted", "dashed", "wavy"]);
var textOrientationValidator = isKeywordFactory(["mixed", "upright", "sideways"]);
var textRenderingValidator = isKeywordFactory(["auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"]);

var textShadowValidator = function textShadowValidator(parsed) {
  if (isShadowT(parsed)) {
    return true;
  }

  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isKeyword(node, "none");
  }

  return false;
};

var textSizeAdjustValidatorKeywords = ["none", "auto"];

var textSizeAdjustValidator = function textSizeAdjustValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isPercentage(node) || isKeyword(node, textSizeAdjustValidatorKeywords);
  }

  return false;
};

var textTransformValidator = isKeywordFactory(["none", "capitalize", "uppercase", "lowercase", "full-width"]);

var transformValidator = function transformValidator(parsed) {
  if (isTransformList(parsed)) {
    return true;
  }

  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isKeyword(node, "none");
  }

  return false;
};

var transformBoxValidator = isKeywordFactory(["border-box", "fill-box", "view-box"]);
var transformStyleValidator = isKeywordFactory(["flat", "preserve-3d"]);
var unicodeBidiValidator = isKeywordFactory(["normal", "embed", "isolate", "bidi-override", "isolate-override", "plaintext"]);
var userSelectValidator = isKeywordFactory(["auto", "text", "none", "contain", "all"]);
var verticalAlignValidatorKeywords = ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"];

var verticalAlignValidator = function verticalAlignValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node) || isKeyword(node, verticalAlignValidatorKeywords);
  }

  return false;
};

var visibilityValidator = isKeywordFactory(["visible", "hidden", "collapse"]);
var whiteSpaceValidator = isKeywordFactory(["normal", "pre", "nowrap", "pre-wrap", "pre-line"]);

var willChangeValidator = function willChangeValidator(parsed) {
  var node = parsed.nodes[0];

  if (parsed.nodes.length === 1 && isKeyword(node, "auto")) {
    return true;
  }

  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isAnimateableFeature(node) && !isVariable(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
};

var wordBreakValidator = isKeywordFactory(["normal", "break-all", "keep-all"]);

var wordSpacingValidator = function wordSpacingValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node) || isKeyword(node, "normal");
  }

  return false;
};

var writingModeValidator = isKeywordFactory(["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr"]);
var msWritingModeValidator = isKeywordFactory(["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr", "lr-tb", "tb-rl", "tb-lr"]);

var zIndexValidator = function zIndexValidator(parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node) || isKeyword(node, "auto");
  }

  return false;
};

var validators = {
  "-moz-appearance": mozAppearanceValidator,
  "-moz-backface-visibility": backfaceVisibilityValidator,
  "-moz-binding": mozBindingValidator,
  "-moz-box-align": msFlexAlignValidator,
  "-moz-box-direction": mozBoxDirectionValidator,
  "-moz-box-orient": mozBoxOrientValidator,
  "-moz-box-pack": mozBoxPackValidator,
  "-moz-box-sizing": boxSizingValidator,
  "-moz-column-count": columnCountValidator,
  "-moz-column-fill": columnFillValidator,
  "-moz-column-gap": columnGapValidator,
  "-moz-column-span": columnSpanValidator,
  "-moz-column-width": columnWidthValidator,
  "-moz-float-edge": mozFloatEdgeValidator,
  "-moz-font-kerning": fontKerningValidator,
  "-moz-font-language-override": fontLanguageOverrideValidator,
  "-moz-force-broken-image-icon": mozForceBrokenImageIconValidator,
  "-moz-hyphens": hyphensValidator,
  "-moz-margin-end": bottomValidator,
  "-moz-margin-start": bottomValidator,
  "-moz-orient": mozOrientValidator,
  "-moz-perspective": perspectiveValidator,
  "-moz-stack-sizing": mozStackSizingValidator,
  "-moz-text-align-last": textAlignLastValidator,
  "-moz-text-blink": mozTextBlinkValidator,
  "-moz-text-decoration-style": textDecorationStyleValidator,
  "-moz-text-size-adjust": textSizeAdjustValidator,
  "-moz-transform": transformValidator,
  "-moz-transform-style": transformStyleValidator,
  "-moz-user-focus": mozUserFocusValidator,
  "-moz-user-input": mozUserInputValidator,
  "-moz-user-modify": mozUserModifyValidator,
  "-moz-user-select": userSelectValidator,
  "-moz-window-shadow": mozWindowShadowValidator,
  "-ms-flex-align": msFlexAlignValidator,
  "-ms-flex-direction": flexDirectionValidator,
  "-ms-flex-item-align": msFlexItemAlignValidator,
  "-ms-flex-line-pack": msFlexLinePackValidator,
  "-ms-flex-pack": msFlexPackValidator,
  "-ms-flex-wrap": flexWrapValidator,
  "-ms-grid-row-align": alignItemsValidator,
  "-ms-hyphens": hyphensValidator,
  "-ms-interpolation-mode": msInterpolationModeValidator,
  "-ms-overflow-style": msOverflowStyleValidator,
  "-ms-scroll-snap-coordinate": scrollSnapCoordinateValidator,
  "-ms-scroll-snap-type": scrollSnapTypeValidator,
  "-ms-text-size-adjust": textSizeAdjustValidator,
  "-ms-transform": transformValidator,
  "-ms-user-select": userSelectValidator,
  "-ms-writing-mode": msWritingModeValidator,
  "-o-object-fit": objectFitValidator,
  "-o-transform": transformValidator,
  "-webkit-align-content": alignContentValidator,
  "-webkit-align-items": alignItemsValidator,
  "-webkit-align-self": alignSelfValidator,
  "-webkit-appearance": appearanceValidator,
  "-webkit-backdrop-filter": backdropFilterValidator,
  "-webkit-backface-visibility": backfaceVisibilityValidator,
  "-webkit-border-before-color": webkitBorderBeforeColorValidator,
  "-webkit-border-before-style": webkitBorderBeforeStyleValidator,
  "-webkit-border-before-width": webkitBorderBeforeWidthValidator,
  "-webkit-box-align": msFlexAlignValidator,
  "-webkit-box-decoration-break": boxDecorationBreakValidator,
  "-webkit-box-direction": mozBoxDirectionValidator,
  "-webkit-box-orient": mozBoxOrientValidator,
  "-webkit-box-pack": mozBoxPackValidator,
  "-webkit-box-sizing": boxSizingValidator,
  "-webkit-column-break-inside": webkitColumnBreakInsideValidator,
  "-webkit-column-count": columnCountValidator,
  "-webkit-column-fill": columnFillValidator,
  "-webkit-column-gap": columnGapValidator,
  "-webkit-column-span": columnSpanValidator,
  "-webkit-column-width": columnWidthValidator,
  "-webkit-filter": backdropFilterValidator,
  "-webkit-flex-direction": flexDirectionValidator,
  "-webkit-flex-wrap": flexWrapValidator,
  "-webkit-font-kerning": fontKerningValidator,
  "-webkit-font-language-override": fontLanguageOverrideValidator,
  "-webkit-hyphens": hyphensValidator,
  "-webkit-justify-content": justifyContentValidator,
  "-webkit-margin-after": bottomValidator,
  "-webkit-margin-before": bottomValidator,
  "-webkit-margin-end": bottomValidator,
  "-webkit-margin-start": bottomValidator,
  "-webkit-mask-attachment": webkitMaskAttachmentValidator,
  "-webkit-mask-composite": webkitMaskCompositeValidator,
  "-webkit-mask-position": webkitMaskPositionValidator,
  "-webkit-mask-repeat": webkitMaskRepeatValidator,
  "-webkit-mask-repeat-x": webkitMaskRepeatXValidator,
  "-webkit-mask-repeat-y": webkitMaskRepeatXValidator,
  "-webkit-perspective": perspectiveValidator,
  "-webkit-scroll-snap-coordinate": scrollSnapCoordinateValidator,
  "-webkit-scroll-snap-type": scrollSnapTypeValidator,
  "-webkit-tap-highlight-color": webkitTapHighlightColorValidator,
  "-webkit-text-decoration-style": textDecorationStyleValidator,
  "-webkit-text-fill-color": webkitBorderBeforeColorValidator,
  "-webkit-text-size-adjust": textSizeAdjustValidator,
  "-webkit-text-stroke-color": webkitBorderBeforeColorValidator,
  "-webkit-text-stroke-width": webkitTextStrokeWidthValidator,
  "-webkit-touch-callout": webkitTouchCalloutValidator,
  "-webkit-transform": transformValidator,
  "-webkit-transform-style": transformStyleValidator,
  "-webkit-user-select": userSelectValidator,
  "-webkit-writing-mode": writingModeValidator,
  "align-content": alignContentValidator,
  "align-items": alignItemsValidator,
  "align-self": alignSelfValidator,
  "all": allValidator,
  "animation-delay": animationDelayValidator,
  "animation-direction": animationDirectionValidator,
  "animation-duration": animationDelayValidator,
  "animation-fill-mode": animationFillModeValidator,
  "animation-iteration-count": animationIterationCountValidator,
  "animation-name": animationNameValidator,
  "animation-play-state": animationPlayStateValidator,
  "animation-timing-function": animationTimingFunctionValidator,
  "appearance": appearanceValidator,
  "backdrop-filter": backdropFilterValidator,
  "backface-visibility": backfaceVisibilityValidator,
  "background-attachment": webkitMaskAttachmentValidator,
  "background-blend-mode": backgroundBlendModeValidator,
  "background-clip": backgroundClipValidator,
  "background-color": webkitBorderBeforeColorValidator,
  "background-image": backgroundImageValidator,
  "background-origin": backgroundClipValidator,
  "background-position": webkitMaskPositionValidator,
  "background-repeat": webkitMaskRepeatValidator,
  "background-size": backgroundSizeValidator,
  "border-block-end-color": webkitBorderBeforeColorValidator,
  "border-block-end-style": webkitBorderBeforeStyleValidator,
  "border-block-end-width": webkitBorderBeforeWidthValidator,
  "border-block-start-color": webkitBorderBeforeColorValidator,
  "border-block-start-style": webkitBorderBeforeStyleValidator,
  "border-block-start-width": webkitBorderBeforeWidthValidator,
  "border-bottom-color": webkitBorderBeforeColorValidator,
  "border-bottom-left-radius": borderBottomLeftRadiusValidator,
  "border-bottom-right-radius": borderBottomLeftRadiusValidator,
  "border-bottom-style": borderBottomStyleValidator,
  "border-bottom-width": borderBottomWidthValidator,
  "border-collapse": borderCollapseValidator,
  "border-color": borderColorValidator,
  "border-image-source": borderImageSourceValidator,
  "border-inline-end-color": webkitBorderBeforeColorValidator,
  "border-inline-end-style": webkitBorderBeforeStyleValidator,
  "border-inline-end-width": webkitBorderBeforeWidthValidator,
  "border-inline-start-color": webkitBorderBeforeColorValidator,
  "border-inline-start-style": webkitBorderBeforeStyleValidator,
  "border-inline-start-width": webkitBorderBeforeWidthValidator,
  "border-left-color": webkitBorderBeforeColorValidator,
  "border-left-style": borderBottomStyleValidator,
  "border-left-width": borderBottomWidthValidator,
  "border-right-color": webkitBorderBeforeColorValidator,
  "border-right-style": borderBottomStyleValidator,
  "border-right-width": borderBottomWidthValidator,
  "border-style": webkitBorderBeforeStyleValidator,
  "border-top-color": webkitBorderBeforeColorValidator,
  "border-top-left-radius": borderBottomLeftRadiusValidator,
  "border-top-right-radius": borderBottomLeftRadiusValidator,
  "border-top-style": borderBottomStyleValidator,
  "border-top-width": borderBottomWidthValidator,
  "border-width": webkitBorderBeforeWidthValidator,
  "bottom": bottomValidator,
  "box-align": boxAlignValidator,
  "box-decoration-break": boxDecorationBreakValidator,
  "box-direction": boxDirectionValidator,
  "box-flex": boxFlexValidator,
  "box-flex-group": mozForceBrokenImageIconValidator,
  "box-lines": boxLinesValidator,
  "box-ordinal-group": mozForceBrokenImageIconValidator,
  "box-orient": boxOrientValidator,
  "box-pack": boxPackValidator,
  "box-sizing": boxSizingValidator,
  "box-suppress": boxSuppressValidator,
  "break-inside": webkitColumnBreakInsideValidator,
  "caption-side": captionSideValidator,
  "clear": clearValidator,
  "color": webkitBorderBeforeColorValidator,
  "column-count": columnCountValidator,
  "column-fill": columnFillValidator,
  "column-gap": columnGapValidator,
  "column-rule-color": webkitBorderBeforeColorValidator,
  "column-rule-style": borderBottomStyleValidator,
  "column-rule-width": borderBottomWidthValidator,
  "column-span": columnSpanValidator,
  "column-width": columnWidthValidator,
  "direction": directionValidator,
  "display": displayValidator,
  "display-inside": displayInsideValidator,
  "display-list": displayListValidator,
  "display-outside": displayOutsideValidator,
  "empty-cells": emptyCellsValidator,
  "filter": backdropFilterValidator,
  "flex-direction": flexDirectionValidator,
  "flex-grow": boxFlexValidator,
  "flex-shrink": boxFlexValidator,
  "flex-wrap": flexWrapValidator,
  "float": floatValidator,
  "font-kerning": fontKerningValidator,
  "font-language-override": fontLanguageOverrideValidator,
  "font-size": fontSizeValidator,
  "font-size-adjust": fontSizeAdjustValidator,
  "font-stretch": fontStretchValidator,
  "font-style": fontStyleValidator,
  "font-variant-caps": fontVariantCapsValidator,
  "font-variant-position": fontVariantPositionValidator,
  "font-weight": fontWeightValidator,
  "grid-auto-columns": gridAutoColumnsValidator,
  "grid-auto-rows": gridAutoColumnsValidator,
  "grid-column-gap": gridColumnGapValidator,
  "grid-row-gap": gridColumnGapValidator,
  "grid-template-areas": gridTemplateAreasValidator,
  "hyphens": hyphensValidator,
  "image-rendering": imageRenderingValidator,
  "ime-mode": imeModeValidator,
  "initial-letter-align": initialLetterAlignValidator,
  "isolation": isolationValidator,
  "justify-content": justifyContentValidator,
  "left": bottomValidator,
  "letter-spacing": letterSpacingValidator,
  "line-break": lineBreakValidator,
  "line-height": lineHeightValidator,
  "list-style-image": mozBindingValidator,
  "list-style-position": listStylePositionValidator,
  "list-style-type": listStyleTypeValidator,
  "margin-block-end": bottomValidator,
  "margin-block-start": bottomValidator,
  "margin-bottom": bottomValidator,
  "margin-inline-end": bottomValidator,
  "margin-inline-start": bottomValidator,
  "margin-left": bottomValidator,
  "margin-right": bottomValidator,
  "margin-top": bottomValidator,
  "marker-offset": columnWidthValidator,
  "mask-composite": maskCompositeValidator,
  "mask-mode": maskModeValidator,
  "mask-origin": maskOriginValidator,
  "mask-position": webkitMaskPositionValidator,
  "mask-repeat": webkitMaskRepeatValidator,
  "mask-size": backgroundSizeValidator,
  "mask-type": maskTypeValidator,
  "max-block-size": maxBlockSizeValidator,
  "max-height": maxBlockSizeValidator,
  "max-inline-size": maxBlockSizeValidator,
  "max-width": maxBlockSizeValidator,
  "min-block-size": maxBlockSizeValidator,
  "min-height": maxBlockSizeValidator,
  "min-inline-size": maxBlockSizeValidator,
  "min-width": maxBlockSizeValidator,
  "mix-blend-mode": mixBlendModeValidator,
  "motion-offset": gridColumnGapValidator,
  "object-fit": objectFitValidator,
  "object-position": objectPositionValidator,
  "offset-block-end": bottomValidator,
  "offset-block-start": bottomValidator,
  "offset-inline-end": bottomValidator,
  "offset-inline-start": bottomValidator,
  "opacity": boxFlexValidator,
  "order": mozForceBrokenImageIconValidator,
  "orphans": mozForceBrokenImageIconValidator,
  "outline-color": outlineColorValidator,
  "outline-offset": webkitTextStrokeWidthValidator,
  "outline-style": outlineStyleValidator,
  "outline-width": borderBottomWidthValidator,
  "overflow": overflowValidator,
  "overflow-clip-box": overflowClipBoxValidator,
  "overflow-wrap": overflowWrapValidator,
  "overflow-x": overflowValidator,
  "overflow-y": overflowValidator,
  "padding-block-end": gridColumnGapValidator,
  "padding-block-start": gridColumnGapValidator,
  "padding-bottom": gridColumnGapValidator,
  "padding-inline-end": gridColumnGapValidator,
  "padding-inline-start": gridColumnGapValidator,
  "padding-left": gridColumnGapValidator,
  "padding-right": gridColumnGapValidator,
  "padding-top": gridColumnGapValidator,
  "page-break-after": pageBreakAfterValidator,
  "page-break-before": pageBreakAfterValidator,
  "page-break-inside": webkitColumnBreakInsideValidator,
  "perspective": perspectiveValidator,
  "perspective-origin": objectPositionValidator,
  "pointer-events": pointerEventsValidator,
  "position": positionValidator,
  "resize": resizeValidator,
  "right": bottomValidator,
  "ruby-align": rubyAlignValidator,
  "ruby-merge": rubyMergeValidator,
  "ruby-position": rubyPositionValidator,
  "scroll-behavior": scrollBehaviorValidator,
  "scroll-snap-coordinate": scrollSnapCoordinateValidator,
  "scroll-snap-destination": objectPositionValidator,
  "scroll-snap-type": scrollSnapTypeValidator,
  "scroll-snap-type-x": scrollSnapTypeValidator,
  "scroll-snap-type-y": scrollSnapTypeValidator,
  "shape-image-threshold": boxFlexValidator,
  "shape-margin": gridColumnGapValidator,
  "tab-size": tabSizeValidator,
  "table-layout": tableLayoutValidator,
  "text-align": textAlignValidator,
  "text-align-last": textAlignLastValidator,
  "text-decoration-color": webkitBorderBeforeColorValidator,
  "text-decoration-style": textDecorationStyleValidator,
  "text-emphasis-color": webkitBorderBeforeColorValidator,
  "text-orientation": textOrientationValidator,
  "text-rendering": textRenderingValidator,
  "text-shadow": textShadowValidator,
  "text-size-adjust": textSizeAdjustValidator,
  "text-transform": textTransformValidator,
  "top": bottomValidator,
  "transform": transformValidator,
  "transform-box": transformBoxValidator,
  "transform-style": transformStyleValidator,
  "transition-delay": animationDelayValidator,
  "transition-duration": animationDelayValidator,
  "transition-timing-function": animationTimingFunctionValidator,
  "unicode-bidi": unicodeBidiValidator,
  "user-select": userSelectValidator,
  "vertical-align": verticalAlignValidator,
  "visibility": visibilityValidator,
  "white-space": whiteSpaceValidator,
  "widows": mozForceBrokenImageIconValidator,
  "will-change": willChangeValidator,
  "word-break": wordBreakValidator,
  "word-spacing": wordSpacingValidator,
  "word-wrap": overflowWrapValidator,
  "writing-mode": writingModeValidator,
  "z-index": zIndexValidator
};
var cssGlobals = ["inherit", "initial", "revert", "unset"];
function cssValues(property, value) {
  if (typeof value === 'string') {
    value = valueParser(value);
  }

  var first = value.nodes[0];

  if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVariable(first))) {
    return true;
  }

  if (validators[property]) {
    if (!!validators[property](value) === false) {
      return invalidMessage('"' + value + '" is not a valid value for "' + property + '".');
    }

    return true;
  }

  return unknownMessage('"' + property + '" is not a recognised property.');
}

export default cssValues;

