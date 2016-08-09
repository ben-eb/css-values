import valueParser, { unit, walk } from 'postcss-value-parser';
import colors from 'css-color-names';
import endsWith from 'ends-with';

function lowercase(value) {
    return value.toLowerCase();
}

function isCaseInsensitiveKeyword(_ref, values) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'word' && ~values.map(lowercase).indexOf(lowercase(value));
}

function isCaseInsensitiveFunction(node, value) {
    return node.type === 'function' && node.value.toLowerCase() === value;
}

var isVar = (function (node) {
  return isCaseInsensitiveFunction(node, 'var');
});

var keywords = ["auto", "none", "scrollbar", "-ms-autohiding-scrollbar"];
function msOverflowStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords);
  }

  return false;
}
var properties = ["-ms-overflow-style"];

var msOverflowStyle$1 = Object.freeze({
  default: msOverflowStyle,
  properties: properties
});

var keywords$1 = ["none", "button", "button-arrow-down", "button-arrow-next", "button-arrow-previous", "button-arrow-up", "button-bevel", "button-focus", "caret", "checkbox", "checkbox-container", "checkbox-label", "checkmenuitem", "dualbutton", "groupbox", "listbox", "listitem", "menuarrow", "menubar", "menucheckbox", "menuimage", "menuitem", "menuitemtext", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menupopup", "menuradio", "menuseparator", "meterbar", "meterchunk", "progressbar", "progressbar-vertical", "progresschunk", "progresschunk-vertical", "radio", "radio-container", "radio-label", "radiomenuitem", "range", "range-thumb", "resizer", "resizerpanel", "scale-horizontal", "scalethumbend", "scalethumb-horizontal", "scalethumbstart", "scalethumbtick", "scalethumb-vertical", "scale-vertical", "scrollbarbutton-down", "scrollbarbutton-left", "scrollbarbutton-right", "scrollbarbutton-up", "scrollbarthumb-horizontal", "scrollbarthumb-vertical", "scrollbartrack-horizontal", "scrollbartrack-vertical", "searchfield", "separator", "sheet", "spinner", "spinner-downbutton", "spinner-textfield", "spinner-upbutton", "splitter", "statusbar", "statusbarpanel", "tab", "tabpanel", "tabpanels", "tab-scroll-arrow-back", "tab-scroll-arrow-forward", "textfield", "textfield-multiline", "toolbar", "toolbarbutton", "toolbarbutton-dropdown", "toolbargripper", "toolbox", "tooltip", "treeheader", "treeheadercell", "treeheadersortarrow", "treeitem", "treeline", "treetwisty", "treetwistyopen", "treeview", "-moz-mac-unified-toolbar", "-moz-win-borderless-glass", "-moz-win-browsertabbar-toolbox", "-moz-win-communicationstext", "-moz-win-communications-toolbox", "-moz-win-exclude-glass", "-moz-win-glass", "-moz-win-mediatext", "-moz-win-media-toolbox", "-moz-window-button-box", "-moz-window-button-box-maximized", "-moz-window-button-close", "-moz-window-button-maximize", "-moz-window-button-minimize", "-moz-window-button-restore", "-moz-window-frame-bottom", "-moz-window-frame-left", "-moz-window-frame-right", "-moz-window-titlebar", "-moz-window-titlebar-maximized"];
function mozAppearance (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$1);
  }

  return false;
}
var properties$1 = ["-moz-appearance"];

var mozAppearance$1 = Object.freeze({
  default: mozAppearance,
  properties: properties$1
});

var keywords$2 = ["border-box", "content-box", "margin-box", "padding-box"];
function mozFloatEdge (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$2);
  }

  return false;
}
var properties$2 = ["-moz-float-edge"];

var mozFloatEdge$1 = Object.freeze({
  default: mozFloatEdge,
  properties: properties$2
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

function mozForceBrokenImageIcon (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node);
  }

  return false;
}
var properties$3 = ["-moz-force-broken-image-icon", "box-flex-group", "box-ordinal-group", "order", "orphans", "widows"];

var mozForceBrokenImageIcon$1 = Object.freeze({
  default: mozForceBrokenImageIcon,
  properties: properties$3
});

var keywords$3 = ["inline", "block", "horizontal", "vertical"];
function mozOrient (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$3);
  }

  return false;
}
var properties$4 = ["-moz-orient"];

var mozOrient$1 = Object.freeze({
  default: mozOrient,
  properties: properties$4
});

var keywords$4 = ["ignore", "stretch-to-fit"];
function mozStackSizing (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$4);
  }

  return false;
}
var properties$5 = ["-moz-stack-sizing"];

var mozStackSizing$1 = Object.freeze({
  default: mozStackSizing,
  properties: properties$5
});

var keywords$5 = ["none", "blink"];
function mozTextBlink (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$5);
  }

  return false;
}
var properties$6 = ["-moz-text-blink"];

var mozTextBlink$1 = Object.freeze({
  default: mozTextBlink,
  properties: properties$6
});

var keywords$6 = ["ignore", "normal", "select-after", "select-before", "select-menu", "select-same", "select-all", "none"];
function mozUserFocus (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$6);
  }

  return false;
}
var properties$7 = ["-moz-user-focus"];

var mozUserFocus$1 = Object.freeze({
  default: mozUserFocus,
  properties: properties$7
});

var keywords$7 = ["none", "enabled", "disabled"];
function mozUserInput (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$7);
  }

  return false;
}
var properties$8 = ["-moz-user-input"];

var mozUserInput$1 = Object.freeze({
  default: mozUserInput,
  properties: properties$8
});

var keywords$8 = ["read-only", "read-write", "write-only"];
function mozUserModify (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$8);
  }

  return false;
}
var properties$9 = ["-moz-user-modify"];

var mozUserModify$1 = Object.freeze({
  default: mozUserModify,
  properties: properties$9
});

var keywords$9 = ["default", "menu", "tooltip", "sheet", "none"];
function mozWindowShadow (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$9);
  }

  return false;
}
var properties$10 = ["-moz-window-shadow"];

var mozWindowShadow$1 = Object.freeze({
  default: mozWindowShadow,
  properties: properties$10
});

var isComma = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'div' && value === ',';
});

var isNumber = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && (!int.unit || /[0-9e\-]/i.test(int.unit));
});

var isPercentage = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && int.unit === '%';
});

var namedColours = Object.keys(colors);

function isRgb(node) {
    if (!isCaseInsensitiveFunction(node, 'rgb')) {
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
    if (!isCaseInsensitiveFunction(node, 'rgba')) {
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
    if (!isCaseInsensitiveFunction(node, 'hsl')) {
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
    if (!isCaseInsensitiveFunction(node, 'hsla')) {
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
    return isCaseInsensitiveKeyword(node, namedColours);
}

function isCurrentColor(node) {
    return node.type === 'word' && node.value.toLowerCase() === 'currentcolor';
}

function isColor(node) {
    return isRgb(node) || isRgba(node) || isHsl(node) || isHsla(node) || isHex(node) || isNamedColor(node) || isCurrentColor(node);
}

function webkitBorderBeforeColor (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isColor(node);
  }

  return false;
}
var properties$11 = ["-webkit-border-before-color", "-webkit-text-fill-color", "-webkit-text-stroke-color", "background-color", "border-block-end-color", "border-block-start-color", "border-bottom-color", "border-inline-end-color", "border-inline-start-color", "border-left-color", "border-right-color", "border-top-color", "color", "column-rule-color", "text-decoration-color", "text-emphasis-color"];

var webkitBorderBeforeColor$1 = Object.freeze({
  default: webkitBorderBeforeColor,
  properties: properties$11
});

var brStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

var isBrStyle = (function (node) {
    return isCaseInsensitiveKeyword(node, brStyles);
});

function webkitBorderBeforeStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrStyle(node);
  }

  return false;
}
var properties$12 = ["-webkit-border-before-style", "border-block-end-style", "border-block-start-style", "border-inline-end-style", "border-inline-start-style", "border-style"];

var webkitBorderBeforeStyle$1 = Object.freeze({
  default: webkitBorderBeforeStyle,
  properties: properties$12
});

var lengths = ['em', 'ex', 'ch', 'rem', 'vh', 'vw', 'vmin', 'vmax', 'px', 'q', 'mm', 'cm', 'in', 'pt', 'pc'];

var isLength = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && (int.number === '0' || ~lengths.indexOf(int.unit));
});

var brWidths = ['thin', 'medium', 'thick'];

var isBrWidth = (function (node) {
    return isLength(node) || isCaseInsensitiveKeyword(node, brWidths);
});

function webkitBorderBeforeWidth (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrWidth(node);
  }

  return false;
}
var properties$13 = ["-webkit-border-before-width", "border-block-end-width", "border-block-start-width", "border-inline-end-width", "border-inline-start-width", "border-width"];

var webkitBorderBeforeWidth$1 = Object.freeze({
  default: webkitBorderBeforeWidth,
  properties: properties$13
});

var singleValues = ['repeat-x', 'repeat-y'];

var multipleValues = ['repeat', 'space', 'round', 'no-repeat'];

var isRepeatStyle = (function (parsed) {
    var group = [];
    var valid = true;
    if (parsed.nodes[parsed.nodes.length - 1].type === 'div') {
        return false;
    }
    parsed.walk(function (node) {
        if (isCaseInsensitiveKeyword(node, singleValues)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isCaseInsensitiveKeyword(node, multipleValues) || isVar(node)) {
            if (group.some(function (n) {
                return isCaseInsensitiveKeyword(n, singleValues);
            }) || group.length === 2) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isComma(node)) {
            group = [];
            return false;
        } else if (node.type !== 'space') {
            valid = false;
        }
        return false;
    });
    return valid;
});

var properties$14 = ["-webkit-mask-repeat", "background-repeat", "mask-repeat"];

var webkitMaskRepeat = Object.freeze({
	default: isRepeatStyle,
	properties: properties$14
});

var keywords$10 = ["repeat", "no-repeat", "space", "round"];
function webkitMaskRepeatX (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$10);
  }

  return false;
}
var properties$15 = ["-webkit-mask-repeat-x", "-webkit-mask-repeat-y"];

var webkitMaskRepeatX$1 = Object.freeze({
  default: webkitMaskRepeatX,
  properties: properties$15
});

function webkitTapHighlightColor (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isColor(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$16 = ["-webkit-tap-highlight-color"];

var webkitTapHighlightColor$1 = Object.freeze({
  default: webkitTapHighlightColor,
  properties: properties$16
});

function webkitTextStrokeWidth (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node);
  }

  return false;
}
var properties$17 = ["-webkit-text-stroke-width", "outline-offset"];

var webkitTextStrokeWidth$1 = Object.freeze({
  default: webkitTextStrokeWidth,
  properties: properties$17
});

var keywords$11 = ["default", "none"];
function webkitTouchCallout (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$11);
  }

  return false;
}
var properties$18 = ["-webkit-touch-callout"];

var webkitTouchCallout$1 = Object.freeze({
  default: webkitTouchCallout,
  properties: properties$18
});

var keywords$12 = ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"];
function alignContent (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$12);
  }

  return false;
}
var properties$19 = ["-webkit-align-content", "align-content"];

var alignContent$1 = Object.freeze({
  default: alignContent,
  properties: properties$19
});

var keywords$13 = ["flex-start", "flex-end", "center", "space-between", "space-around", "stretch", "start", "end", "justify", "distribute"];
function msFlexLinePack (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$13);
  }

  return false;
}
var properties$20 = ["-ms-flex-line-pack"];

var msFlexLinePack$1 = Object.freeze({
  default: msFlexLinePack,
  properties: properties$20
});

var keywords$14 = ["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"];
function msFlexAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$14);
  }

  return false;
}
var properties$21 = ["-webkit-box-align", "-moz-box-align", "-ms-flex-align"];

var msFlexAlign$1 = Object.freeze({
  default: msFlexAlign,
  properties: properties$21
});

var keywords$15 = ["flex-start", "flex-end", "center", "baseline", "stretch"];
function alignItems (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$15);
  }

  return false;
}
var properties$22 = ["-webkit-align-items", "-ms-grid-row-align", "align-items"];

var alignItems$1 = Object.freeze({
  default: alignItems,
  properties: properties$22
});

var keywords$16 = ["auto", "flex-start", "flex-end", "center", "baseline", "stretch"];
function alignSelf (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$16);
  }

  return false;
}
var properties$23 = ["-webkit-align-self", "align-self"];

var alignSelf$1 = Object.freeze({
  default: alignSelf,
  properties: properties$23
});

var keywords$17 = ["auto", "flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"];
function msFlexItemAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$17);
  }

  return false;
}
var properties$24 = ["-ms-flex-item-align"];

var msFlexItemAlign$1 = Object.freeze({
  default: msFlexItemAlign,
  properties: properties$24
});

var units = ['s', 'ms'];

var isTime = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && ~units.indexOf(int.unit);
});

function animationDelay (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isTime(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$25 = ["animation-delay", "animation-duration", "transition-delay", "transition-duration"];

var animationDelay$1 = Object.freeze({
  default: animationDelay,
  properties: properties$25
});

var singleAnimationDirections = ['normal', 'reverse', 'alternate', 'alternate-reverse'];

var isSingleAnimationDirection = (function (node) {
    return isCaseInsensitiveKeyword(node, singleAnimationDirections);
});

function animationDirection (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationDirection(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$26 = ["animation-direction"];

var animationDirection$1 = Object.freeze({
  default: animationDirection,
  properties: properties$26
});

var singleAnimationFillModes = ['none', 'forwards', 'backwards', 'both'];

var isSingleAnimationFillMode = (function (node) {
    return isCaseInsensitiveKeyword(node, singleAnimationFillModes);
});

function animationFillMode (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationFillMode(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$27 = ["animation-fill-mode"];

var animationFillMode$1 = Object.freeze({
  default: animationFillMode,
  properties: properties$27
});

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
        return true;
    }
    return !/[0-9]/.test(value[0]);
});

var isSingleAnimationName = (function (node) {
    return node.type === 'word' && (node.value.toLowerCase() === 'none' || isCustomIdent(node));
});

function animationName (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationName(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$28 = ["animation-name"];

var animationName$1 = Object.freeze({
  default: animationName,
  properties: properties$28
});

var singleAnimationPlayStates = ['running', 'paused'];

var isSingleAnimationPlayState = (function (node) {
    return isCaseInsensitiveKeyword(node, singleAnimationPlayStates);
});

function animationPlayState (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleAnimationPlayState(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$29 = ["animation-play-state"];

var animationPlayState$1 = Object.freeze({
  default: animationPlayState,
  properties: properties$29
});

var keywords$18 = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];

var stepsKeywords = ['start', 'end'];

function isKeyword(node) {
    return isCaseInsensitiveKeyword(node, keywords$18);
}

function isSteps(node) {
    if (!isCaseInsensitiveFunction(node, 'steps') || !isInteger(node.nodes[0])) {
        return false;
    }
    var one = node.nodes[1];
    var two = node.nodes[2];
    if (one && !isComma(one)) {
        return false;
    }
    if (two) {
        return isCaseInsensitiveKeyword(two, stepsKeywords);
    }
    return true;
}

function isValidAbscissa(_ref) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'word' && value >= 0 && value <= 1;
}

function isCubicBezier(node) {
    if (!isCaseInsensitiveFunction(node, 'cubic-bezier')) {
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
    return isKeyword(node) || isSteps(node) || isCubicBezier(node);
});

function animationTimingFunction (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isSingleTransitionTimingFunction(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$30 = ["animation-timing-function", "transition-timing-function"];

var animationTimingFunction$1 = Object.freeze({
  default: animationTimingFunction,
  properties: properties$30
});

var keywords$19 = ["auto", "none"];
function appearance (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$19);
  }

  return false;
}
var properties$31 = ["-webkit-appearance", "-moz-appearance", "appearance"];

var appearance$1 = Object.freeze({
  default: appearance,
  properties: properties$31
});

var keywords$20 = ["visible", "hidden"];
function backfaceVisibility (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$20);
  }

  return false;
}
var properties$32 = ["-webkit-backface-visibility", "-moz-backface-visibility", "backface-visibility"];

var backfaceVisibility$1 = Object.freeze({
  default: backfaceVisibility,
  properties: properties$32
});

var attachments = ['scroll', 'fixed', 'local'];

var isAttachment = (function (node) {
    return isCaseInsensitiveKeyword(node, attachments);
});

function backgroundAttachment (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isAttachment(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$33 = ["background-attachment"];

var backgroundAttachment$1 = Object.freeze({
  default: backgroundAttachment,
  properties: properties$33
});

var blendValues = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

var isBlendMode = (function (node) {
    return isCaseInsensitiveKeyword(node, blendValues);
});

function backgroundBlendMode (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBlendMode(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$34 = ["background-blend-mode"];

var backgroundBlendMode$1 = Object.freeze({
  default: backgroundBlendMode,
  properties: properties$34
});

var boxes = ['border-box', 'padding-box', 'content-box'];

var isBox = (function (node) {
    return isCaseInsensitiveKeyword(node, boxes);
});

function backgroundClip (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isBox(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$35 = ["background-clip", "background-origin"];

var backgroundClip$1 = Object.freeze({
  default: backgroundClip,
  properties: properties$35
});

var isLengthPercentage = (function (node) {
    return isLength(node) || isPercentage(node);
});

function borderBottomLeftRadius (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node);
  }

  return false;
}
var properties$36 = ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"];

var borderBottomLeftRadius$1 = Object.freeze({
  default: borderBottomLeftRadius,
  properties: properties$36
});

function borderBottomStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrStyle(node);
  }

  return false;
}
var properties$37 = ["border-bottom-style", "border-left-style", "border-right-style", "border-top-style", "column-rule-style"];

var borderBottomStyle$1 = Object.freeze({
  default: borderBottomStyle,
  properties: properties$37
});

function borderBottomWidth (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrWidth(node);
  }

  return false;
}
var properties$38 = ["border-bottom-width", "border-left-width", "border-right-width", "border-top-width", "column-rule-width", "outline-width"];

var borderBottomWidth$1 = Object.freeze({
  default: borderBottomWidth,
  properties: properties$38
});

var keywords$21 = ["collapse", "separate"];
function borderCollapse (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$21);
  }

  return false;
}
var properties$39 = ["border-collapse"];

var borderCollapse$1 = Object.freeze({
  default: borderCollapse,
  properties: properties$39
});

function borderColor (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isColor(node);
  }

  return false;
}
var properties$40 = ["border-color"];

var borderColor$1 = Object.freeze({
  default: borderColor,
  properties: properties$40
});

function bottom (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isPercentage(node) || node.value.toLowerCase() === "auto";
  }

  return false;
}
var properties$41 = ["bottom", "left", "-webkit-margin-after", "margin-block-end", "-webkit-margin-before", "margin-block-start", "margin-bottom", "-webkit-margin-end", "-moz-margin-end", "margin-inline-end", "-webkit-margin-start", "-moz-margin-start", "margin-inline-start", "margin-left", "margin-right", "margin-top", "offset-block-end", "offset-block-start", "offset-inline-end", "offset-inline-start", "right", "top"];

var bottom$1 = Object.freeze({
  default: bottom,
  properties: properties$41
});

var keywords$22 = ["start", "center", "end", "baseline", "stretch"];
function boxAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$22);
  }

  return false;
}
var properties$42 = ["box-align"];

var boxAlign$1 = Object.freeze({
  default: boxAlign,
  properties: properties$42
});

var keywords$23 = ["slice", "clone"];
function boxDecorationBreak (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$23);
  }

  return false;
}
var properties$43 = ["-webkit-box-decoration-break", "box-decoration-break"];

var boxDecorationBreak$1 = Object.freeze({
  default: boxDecorationBreak,
  properties: properties$43
});

var keywords$24 = ["normal", "reverse", "inherit"];
function boxDirection (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$24);
  }

  return false;
}
var properties$44 = ["box-direction"];

var boxDirection$1 = Object.freeze({
  default: boxDirection,
  properties: properties$44
});

function boxFlex (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node);
  }

  return false;
}
var properties$45 = ["box-flex", "flex-grow", "flex-shrink", "opacity", "shape-image-threshold"];

var boxFlex$1 = Object.freeze({
  default: boxFlex,
  properties: properties$45
});

var keywords$25 = ["single", "multiple"];
function boxLines (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$25);
  }

  return false;
}
var properties$46 = ["box-lines"];

var boxLines$1 = Object.freeze({
  default: boxLines,
  properties: properties$46
});

var keywords$26 = ["horizontal", "vertical", "inline-axis", "block-axis", "inherit"];
function boxOrient (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$26);
  }

  return false;
}
var properties$47 = ["box-orient"];

var boxOrient$1 = Object.freeze({
  default: boxOrient,
  properties: properties$47
});

var keywords$27 = ["start", "center", "end", "justify"];
function boxPack (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$27);
  }

  return false;
}
var properties$48 = ["box-pack"];

var boxPack$1 = Object.freeze({
  default: boxPack,
  properties: properties$48
});

var keywords$28 = ["content-box", "border-box"];
function boxSizing (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$28);
  }

  return false;
}
var properties$49 = ["-webkit-box-sizing", "-moz-box-sizing", "box-sizing"];

var boxSizing$1 = Object.freeze({
  default: boxSizing,
  properties: properties$49
});

var keywords$29 = ["show", "discard", "hide"];
function boxSuppress (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$29);
  }

  return false;
}
var properties$50 = ["box-suppress"];

var boxSuppress$1 = Object.freeze({
  default: boxSuppress,
  properties: properties$50
});

var keywords$30 = ["auto", "always", "avoid", "left", "right"];
function pageBreakAfter (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$30);
  }

  return false;
}
var properties$51 = ["page-break-after", "page-break-before"];

var pageBreakAfter$1 = Object.freeze({
  default: pageBreakAfter,
  properties: properties$51
});

var keywords$31 = ["auto", "avoid", "avoid-page", "avoid-column", "avoid-region"];
function webkitColumnBreakInside (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$31);
  }

  return false;
}
var properties$52 = ["-webkit-column-break-inside", "page-break-inside", "break-inside"];

var webkitColumnBreakInside$1 = Object.freeze({
  default: webkitColumnBreakInside,
  properties: properties$52
});

var keywords$32 = ["top", "bottom", "block-start", "block-end", "inline-start", "inline-end"];
function captionSide (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$32);
  }

  return false;
}
var properties$53 = ["caption-side"];

var captionSide$1 = Object.freeze({
  default: captionSide,
  properties: properties$53
});

var keywords$33 = ["none", "left", "right", "both", "inline-start", "inline-end"];
function clear (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$33);
  }

  return false;
}
var properties$54 = ["clear"];

var clear$1 = Object.freeze({
  default: clear,
  properties: properties$54
});

function columnCount (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || node.value.toLowerCase() === "auto";
  }

  return false;
}
var properties$55 = ["-webkit-column-count", "-moz-column-count", "column-count"];

var columnCount$1 = Object.freeze({
  default: columnCount,
  properties: properties$55
});

var keywords$34 = ["auto", "balance"];
function columnFill (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$34);
  }

  return false;
}
var properties$56 = ["-webkit-column-fill", "-moz-column-fill", "column-fill"];

var columnFill$1 = Object.freeze({
  default: columnFill,
  properties: properties$56
});

function columnGap (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || node.value.toLowerCase() === "normal";
  }

  return false;
}
var properties$57 = ["-webkit-column-gap", "-moz-column-gap", "column-gap"];

var columnGap$1 = Object.freeze({
  default: columnGap,
  properties: properties$57
});

var keywords$35 = ["none", "all"];
function columnSpan (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$35);
  }

  return false;
}
var properties$58 = ["-webkit-column-span", "-moz-column-span", "column-span"];

var columnSpan$1 = Object.freeze({
  default: columnSpan,
  properties: properties$58
});

function columnWidth (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || node.value.toLowerCase() === "auto";
  }

  return false;
}
var properties$59 = ["-webkit-column-width", "-moz-column-width", "column-width", "marker-offset"];

var columnWidth$1 = Object.freeze({
  default: columnWidth,
  properties: properties$59
});

var keywords$36 = ["ltr", "rtl"];
function direction (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$36);
  }

  return false;
}
var properties$60 = ["direction"];

var direction$1 = Object.freeze({
  default: direction,
  properties: properties$60
});

var keywords$37 = ["none", "inline", "block", "list-item", "inline-list-item", "inline-block", "inline-table", "table", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "flex", "inline-flex", "grid", "inline-grid", "run-in", "ruby", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container", "contents", "-webkit-box", "-webkit-flex", "-moz-box", "-ms-flexbox", "-webkit-inline-box", "-webkit-inline-flex", "-moz-inline-box", "-ms-inline-flexbox", "-ms-grid", "-ms-inline-grid"];
function display (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$37);
  }

  return false;
}
var properties$61 = ["display"];

var display$1 = Object.freeze({
  default: display,
  properties: properties$61
});

var keywords$38 = ["auto", "block", "table", "flex", "grid", "ruby"];
function displayInside (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$38);
  }

  return false;
}
var properties$62 = ["display-inside"];

var displayInside$1 = Object.freeze({
  default: displayInside,
  properties: properties$62
});

var keywords$39 = ["none", "list-item"];
function displayList (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$39);
  }

  return false;
}
var properties$63 = ["display-list"];

var displayList$1 = Object.freeze({
  default: displayList,
  properties: properties$63
});

var keywords$40 = ["block-level", "inline-level", "run-in", "contents", "none", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-cell", "table-column-group", "table-column", "table-caption", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container"];
function displayOutside (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$40);
  }

  return false;
}
var properties$64 = ["display-outside"];

var displayOutside$1 = Object.freeze({
  default: displayOutside,
  properties: properties$64
});

var keywords$41 = ["show", "hide"];
function emptyCells (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$41);
  }

  return false;
}
var properties$65 = ["empty-cells"];

var emptyCells$1 = Object.freeze({
  default: emptyCells,
  properties: properties$65
});

var keywords$42 = ["row", "row-reverse", "column", "column-reverse", "horizontal", "vertical"];
function mozBoxOrient (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$42);
  }

  return false;
}
var properties$66 = ["-webkit-box-orient", "-moz-box-orient"];

var mozBoxOrient$1 = Object.freeze({
  default: mozBoxOrient,
  properties: properties$66
});

var keywords$43 = ["row", "row-reverse", "column", "column-reverse", "normal", "reverse"];
function mozBoxDirection (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$43);
  }

  return false;
}
var properties$67 = ["-webkit-box-direction", "-moz-box-direction"];

var mozBoxDirection$1 = Object.freeze({
  default: mozBoxDirection,
  properties: properties$67
});

var keywords$44 = ["row", "row-reverse", "column", "column-reverse"];
function flexDirection (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$44);
  }

  return false;
}
var properties$68 = ["-webkit-flex-direction", "-ms-flex-direction", "flex-direction"];

var flexDirection$1 = Object.freeze({
  default: flexDirection,
  properties: properties$68
});

var keywords$45 = ["nowrap", "wrap", "wrap-reverse"];
function flexWrap (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$45);
  }

  return false;
}
var properties$69 = ["-webkit-flex-wrap", "-ms-flex-wrap", "flex-wrap"];

var flexWrap$1 = Object.freeze({
  default: flexWrap,
  properties: properties$69
});

var keywords$46 = ["left", "right", "none", "inline-start", "inline-end"];
function float (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$46);
  }

  return false;
}
var properties$70 = ["float"];

var float$1 = Object.freeze({
  default: float,
  properties: properties$70
});

var keywords$47 = ["auto", "normal", "none"];
function fontKerning (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$47);
  }

  return false;
}
var properties$71 = ["-webkit-font-kerning", "-moz-font-kerning", "font-kerning"];

var fontKerning$1 = Object.freeze({
  default: fontKerning,
  properties: properties$71
});

var isString = (function (_ref) {
  var type = _ref.type;
  return type === 'string';
});

function fontLanguageOverride (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isString(node) || node.value.toLowerCase() === "normal";
  }

  return false;
}
var properties$72 = ["-webkit-font-language-override", "-moz-font-language-override", "font-language-override"];

var fontLanguageOverride$1 = Object.freeze({
  default: fontLanguageOverride,
  properties: properties$72
});

var absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

var isAbsoluteSize = (function (node) {
    return isCaseInsensitiveKeyword(node, absoluteSizes);
});

var relativeSizes = ['larger', 'smaller'];

var isRelativeSize = (function (node) {
    return isCaseInsensitiveKeyword(node, relativeSizes);
});

function fontSize (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isAbsoluteSize(node) || isRelativeSize(node) || isLengthPercentage(node);
  }

  return false;
}
var properties$73 = ["font-size"];

var fontSize$1 = Object.freeze({
  default: fontSize,
  properties: properties$73
});

function fontSizeAdjust (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || node.value.toLowerCase() === "none";
  }

  return false;
}
var properties$74 = ["font-size-adjust"];

var fontSizeAdjust$1 = Object.freeze({
  default: fontSizeAdjust,
  properties: properties$74
});

var keywords$48 = ["normal", "ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"];
function fontStretch (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$48);
  }

  return false;
}
var properties$75 = ["font-stretch"];

var fontStretch$1 = Object.freeze({
  default: fontStretch,
  properties: properties$75
});

var keywords$49 = ["normal", "italic", "oblique"];
function fontStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$49);
  }

  return false;
}
var properties$76 = ["font-style"];

var fontStyle$1 = Object.freeze({
  default: fontStyle,
  properties: properties$76
});

var keywords$50 = ["normal", "small-caps", "all-small-caps", "petite-caps", "all-petite-caps", "unicase", "titling-caps"];
function fontVariantCaps (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$50);
  }

  return false;
}
var properties$77 = ["font-variant-caps"];

var fontVariantCaps$1 = Object.freeze({
  default: fontVariantCaps,
  properties: properties$77
});

var keywords$51 = ["normal", "sub", "super"];
function fontVariantPosition (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$51);
  }

  return false;
}
var properties$78 = ["font-variant-position"];

var fontVariantPosition$1 = Object.freeze({
  default: fontVariantPosition,
  properties: properties$78
});

var keywords$52 = ["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
function fontWeight (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$52);
  }

  return false;
}
var properties$79 = ["font-weight"];

var fontWeight$1 = Object.freeze({
  default: fontWeight,
  properties: properties$79
});

function gridColumnGap (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node);
  }

  return false;
}
var properties$80 = ["grid-column-gap", "grid-row-gap", "motion-offset", "shape-margin"];

var gridColumnGap$1 = Object.freeze({
  default: gridColumnGap,
  properties: properties$80
});

function gridTemplateAreas (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isString(node) || node.value.toLowerCase() === "none";
  }

  return false;
}
var properties$81 = ["grid-template-areas"];

var gridTemplateAreas$1 = Object.freeze({
  default: gridTemplateAreas,
  properties: properties$81
});

var keywords$53 = ["none", "manual", "auto"];
function hyphens (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$53);
  }

  return false;
}
var properties$82 = ["-webkit-hyphens", "-moz-hyphens", "-ms-hyphens", "hyphens"];

var hyphens$1 = Object.freeze({
  default: hyphens,
  properties: properties$82
});

var keywords$54 = ["auto", "crisp-edges", "pixelated", "-moz-crisp-edges", "-o-pixelated"];
function imageRendering (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$54);
  }

  return false;
}
var properties$83 = ["image-rendering"];

var imageRendering$1 = Object.freeze({
  default: imageRendering,
  properties: properties$83
});

var keywords$55 = ["auto", "crisp-edges", "pixelated", "nearest-neighbor"];
function msInterpolationMode (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$55);
  }

  return false;
}
var properties$84 = ["-ms-interpolation-mode"];

var msInterpolationMode$1 = Object.freeze({
  default: msInterpolationMode,
  properties: properties$84
});

var keywords$56 = ["auto", "normal", "active", "inactive", "disabled"];
function imeMode (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$56);
  }

  return false;
}
var properties$85 = ["ime-mode"];

var imeMode$1 = Object.freeze({
  default: imeMode,
  properties: properties$85
});

var keywords$57 = ["auto", "alphabetic", "hanging", "ideographic"];
function initialLetterAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$57);
  }

  return false;
}
var properties$86 = ["initial-letter-align"];

var initialLetterAlign$1 = Object.freeze({
  default: initialLetterAlign,
  properties: properties$86
});

var keywords$58 = ["auto", "isolate"];
function isolation (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$58);
  }

  return false;
}
var properties$87 = ["isolation"];

var isolation$1 = Object.freeze({
  default: isolation,
  properties: properties$87
});

var keywords$59 = ["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify"];
function mozBoxPack (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$59);
  }

  return false;
}
var properties$88 = ["-webkit-box-pack", "-moz-box-pack"];

var mozBoxPack$1 = Object.freeze({
  default: mozBoxPack,
  properties: properties$88
});

var keywords$60 = ["flex-start", "flex-end", "center", "space-between", "space-around"];
function justifyContent (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$60);
  }

  return false;
}
var properties$89 = ["-webkit-justify-content", "justify-content"];

var justifyContent$1 = Object.freeze({
  default: justifyContent,
  properties: properties$89
});

var keywords$61 = ["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify", "distribute"];
function msFlexPack (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$61);
  }

  return false;
}
var properties$90 = ["-ms-flex-pack"];

var msFlexPack$1 = Object.freeze({
  default: msFlexPack,
  properties: properties$90
});

function letterSpacing (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || node.value.toLowerCase() === "normal";
  }

  return false;
}
var properties$91 = ["letter-spacing"];

var letterSpacing$1 = Object.freeze({
  default: letterSpacing,
  properties: properties$91
});

var keywords$62 = ["auto", "loose", "normal", "strict"];
function lineBreak (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$62);
  }

  return false;
}
var properties$92 = ["line-break"];

var lineBreak$1 = Object.freeze({
  default: lineBreak,
  properties: properties$92
});

function lineHeight (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isNumber(node) || isLength(node) || isPercentage(node) || node.value.toLowerCase() === "normal";
  }

  return false;
}
var properties$93 = ["line-height"];

var lineHeight$1 = Object.freeze({
  default: lineHeight,
  properties: properties$93
});

var keywords$63 = ["inside", "outside"];
function listStylePosition (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$63);
  }

  return false;
}
var properties$94 = ["list-style-position"];

var listStylePosition$1 = Object.freeze({
  default: listStylePosition,
  properties: properties$94
});

var compositingOperators = ['add', 'subtract', 'intersect', 'exclude'];

var isCompositingOperator = (function (node) {
    return isCaseInsensitiveKeyword(node, compositingOperators);
});

function maskComposite (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isCompositingOperator(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$95 = ["mask-composite"];

var maskComposite$1 = Object.freeze({
  default: maskComposite,
  properties: properties$95
});

var maskingModes = ['alpha', 'luminance', 'match-source'];

var isMaskingMode = (function (node) {
    return isCaseInsensitiveKeyword(node, maskingModes);
});

function maskMode (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isMaskingMode(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$96 = ["mask-mode"];

var maskMode$1 = Object.freeze({
  default: maskMode,
  properties: properties$96
});

var keywords$64 = ["luminance", "alpha"];
function maskType (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$64);
  }

  return false;
}
var properties$97 = ["mask-type"];

var maskType$1 = Object.freeze({
  default: maskType,
  properties: properties$97
});

var keywords$65 = ["none", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];
function maxBlockSize (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isPercentage(node) || isCaseInsensitiveKeyword(node, keywords$65);
  }

  return false;
}
var properties$98 = ["max-block-size", "max-height", "max-inline-size", "max-width"];

var maxBlockSize$1 = Object.freeze({
  default: maxBlockSize,
  properties: properties$98
});

var keywords$66 = ["auto", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];
function minBlockSize (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isPercentage(node) || isCaseInsensitiveKeyword(node, keywords$66);
  }

  return false;
}
var properties$99 = ["min-block-size", "min-height", "min-inline-size", "min-width"];

var minBlockSize$1 = Object.freeze({
  default: minBlockSize,
  properties: properties$99
});

function mixBlendMode (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBlendMode(node);
  }

  return false;
}
var properties$100 = ["mix-blend-mode"];

var mixBlendMode$1 = Object.freeze({
  default: mixBlendMode,
  properties: properties$100
});

var keywords$67 = ["fill", "contain", "cover", "none", "scale-down"];
function objectFit (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$67);
  }

  return false;
}
var properties$101 = ["-o-object-fit", "object-fit"];

var objectFit$1 = Object.freeze({
  default: objectFit,
  properties: properties$101
});

function outlineColor (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isColor(node) || node.value.toLowerCase() === "invert";
  }

  return false;
}
var properties$102 = ["outline-color"];

var outlineColor$1 = Object.freeze({
  default: outlineColor,
  properties: properties$102
});

function outlineStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isBrStyle(node) || node.value.toLowerCase() === "auto";
  }

  return false;
}
var properties$103 = ["outline-style"];

var outlineStyle$1 = Object.freeze({
  default: outlineStyle,
  properties: properties$103
});

var keywords$68 = ["visible", "hidden", "scroll", "auto"];
function overflow (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$68);
  }

  return false;
}
var properties$104 = ["overflow", "overflow-x", "overflow-y"];

var overflow$1 = Object.freeze({
  default: overflow,
  properties: properties$104
});

var keywords$69 = ["padding-box", "content-box"];
function overflowClipBox (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$69);
  }

  return false;
}
var properties$105 = ["overflow-clip-box"];

var overflowClipBox$1 = Object.freeze({
  default: overflowClipBox,
  properties: properties$105
});

var keywords$70 = ["normal", "break-word"];
function overflowWrap (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$70);
  }

  return false;
}
var properties$106 = ["overflow-wrap", "word-wrap"];

var overflowWrap$1 = Object.freeze({
  default: overflowWrap,
  properties: properties$106
});

function paddingBlockEnd (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || isPercentage(node);
  }

  return false;
}
var properties$107 = ["padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top"];

var paddingBlockEnd$1 = Object.freeze({
  default: paddingBlockEnd,
  properties: properties$107
});

var keywords$71 = ["auto", "avoid"];
function pageBreakInside (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$71);
  }

  return false;
}
var properties$108 = ["page-break-inside"];

var pageBreakInside$1 = Object.freeze({
  default: pageBreakInside,
  properties: properties$108
});

function perspective (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLength(node) || node.value.toLowerCase() === "none";
  }

  return false;
}
var properties$109 = ["-webkit-perspective", "-moz-perspective", "perspective"];

var perspective$1 = Object.freeze({
  default: perspective,
  properties: properties$109
});

var keywords$72 = ["auto", "none", "visiblePainted", "visibleFill", "visibleStroke", "visible", "painted", "fill", "stroke", "all", "inherit"];
function pointerEvents (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$72);
  }

  return false;
}
var properties$110 = ["pointer-events"];

var pointerEvents$1 = Object.freeze({
  default: pointerEvents,
  properties: properties$110
});

var keywords$73 = ["static", "relative", "absolute", "sticky", "fixed", "-webkit-sticky"];
function position (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$73);
  }

  return false;
}
var properties$111 = ["position"];

var position$1 = Object.freeze({
  default: position,
  properties: properties$111
});

var keywords$74 = ["none", "both", "horizontal", "vertical"];
function resize (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$74);
  }

  return false;
}
var properties$112 = ["resize"];

var resize$1 = Object.freeze({
  default: resize,
  properties: properties$112
});

var keywords$75 = ["start", "center", "space-between", "space-around"];
function rubyAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$75);
  }

  return false;
}
var properties$113 = ["ruby-align"];

var rubyAlign$1 = Object.freeze({
  default: rubyAlign,
  properties: properties$113
});

var keywords$76 = ["separate", "collapse", "auto"];
function rubyMerge (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$76);
  }

  return false;
}
var properties$114 = ["ruby-merge"];

var rubyMerge$1 = Object.freeze({
  default: rubyMerge,
  properties: properties$114
});

var keywords$77 = ["over", "under", "inter-character"];
function rubyPosition (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$77);
  }

  return false;
}
var properties$115 = ["ruby-position"];

var rubyPosition$1 = Object.freeze({
  default: rubyPosition,
  properties: properties$115
});

var keywords$78 = ["auto", "smooth"];
function scrollBehavior (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$78);
  }

  return false;
}
var properties$116 = ["scroll-behavior"];

var scrollBehavior$1 = Object.freeze({
  default: scrollBehavior,
  properties: properties$116
});

var keywords$79 = ["none", "mandatory", "proximity"];
function scrollSnapType (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$79);
  }

  return false;
}
var properties$117 = ["-webkit-scroll-snap-type", "-ms-scroll-snap-type", "scroll-snap-type", "scroll-snap-type-x", "scroll-snap-type-y"];

var scrollSnapType$1 = Object.freeze({
  default: scrollSnapType,
  properties: properties$117
});

function tabSize (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node) || isLength(node);
  }

  return false;
}
var properties$118 = ["tab-size"];

var tabSize$1 = Object.freeze({
  default: tabSize,
  properties: properties$118
});

var keywords$80 = ["auto", "fixed"];
function tableLayout (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$80);
  }

  return false;
}
var properties$119 = ["table-layout"];

var tableLayout$1 = Object.freeze({
  default: tableLayout,
  properties: properties$119
});

var keywords$81 = ["start", "end", "left", "right", "center", "justify", "match-parent"];
function textAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$81);
  }

  return false;
}
var properties$120 = ["text-align"];

var textAlign$1 = Object.freeze({
  default: textAlign,
  properties: properties$120
});

var keywords$82 = ["auto", "start", "end", "left", "right", "center", "justify"];
function textAlignLast (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$82);
  }

  return false;
}
var properties$121 = ["-moz-text-align-last", "text-align-last"];

var textAlignLast$1 = Object.freeze({
  default: textAlignLast,
  properties: properties$121
});

var keywords$83 = ["solid", "double", "dotted", "dashed", "wavy"];
function textDecorationStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$83);
  }

  return false;
}
var properties$122 = ["-webkit-text-decoration-style", "-moz-text-decoration-style", "text-decoration-style"];

var textDecorationStyle$1 = Object.freeze({
  default: textDecorationStyle,
  properties: properties$122
});

var keywords$84 = ["mixed", "upright", "sideways"];
function textOrientation (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$84);
  }

  return false;
}
var properties$123 = ["text-orientation"];

var textOrientation$1 = Object.freeze({
  default: textOrientation,
  properties: properties$123
});

var keywords$85 = ["auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"];
function textRendering (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$85);
  }

  return false;
}
var properties$124 = ["text-rendering"];

var textRendering$1 = Object.freeze({
  default: textRendering,
  properties: properties$124
});

var keywords$86 = ["none", "auto"];
function textSizeAdjust (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isPercentage(node) || isCaseInsensitiveKeyword(node, keywords$86);
  }

  return false;
}
var properties$125 = ["-webkit-text-size-adjust", "-moz-text-size-adjust", "-ms-text-size-adjust", "text-size-adjust"];

var textSizeAdjust$1 = Object.freeze({
  default: textSizeAdjust,
  properties: properties$125
});

var keywords$87 = ["none", "capitalize", "uppercase", "lowercase", "full-width"];
function textTransform (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$87);
  }

  return false;
}
var properties$126 = ["text-transform"];

var textTransform$1 = Object.freeze({
  default: textTransform,
  properties: properties$126
});

var keywords$88 = ["border-box", "fill-box", "view-box"];
function transformBox (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$88);
  }

  return false;
}
var properties$127 = ["transform-box"];

var transformBox$1 = Object.freeze({
  default: transformBox,
  properties: properties$127
});

var keywords$89 = ["flat", "preserve-3d"];
function transformStyle (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$89);
  }

  return false;
}
var properties$128 = ["-webkit-transform-style", "-moz-transform-style", "transform-style"];

var transformStyle$1 = Object.freeze({
  default: transformStyle,
  properties: properties$128
});

var keywords$90 = ["normal", "embed", "isolate", "bidi-override", "isolate-override", "plaintext"];
function unicodeBidi (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$90);
  }

  return false;
}
var properties$129 = ["unicode-bidi"];

var unicodeBidi$1 = Object.freeze({
  default: unicodeBidi,
  properties: properties$129
});

var keywords$91 = ["auto", "text", "none", "contain", "all"];
function userSelect (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$91);
  }

  return false;
}
var properties$130 = ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"];

var userSelect$1 = Object.freeze({
  default: userSelect,
  properties: properties$130
});

var keywords$92 = ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"];
function verticalAlign (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isPercentage(node) || isLength(node) || isCaseInsensitiveKeyword(node, keywords$92);
  }

  return false;
}
var properties$131 = ["vertical-align"];

var verticalAlign$1 = Object.freeze({
  default: verticalAlign,
  properties: properties$131
});

var keywords$93 = ["visible", "hidden", "collapse"];
function visibility (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$93);
  }

  return false;
}
var properties$132 = ["visibility"];

var visibility$1 = Object.freeze({
  default: visibility,
  properties: properties$132
});

var keywords$94 = ["normal", "pre", "nowrap", "pre-wrap", "pre-line"];
function whiteSpace (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$94);
  }

  return false;
}
var properties$133 = ["white-space"];

var whiteSpace$1 = Object.freeze({
  default: whiteSpace,
  properties: properties$133
});

var animateableFeatures = ['scroll-position', 'contents'];

var isAnimateableFeature = (function (node) {
  return isCaseInsensitiveKeyword(node, animateableFeatures) || isCustomIdent(node);
});

function willChange (parsed) {
  var valid = true;
  parsed.walk(function (node, index) {
    var even = index % 2 === 0;

    if (even && !isAnimateableFeature(node) && !isVar(node) || !even && !isComma(node)) {
      valid = false;
    }

    return false;
  });
  return valid && parsed.nodes.length % 2 !== 0;
}
var properties$134 = ["will-change"];

var willChange$1 = Object.freeze({
  default: willChange,
  properties: properties$134
});

var keywords$95 = ["normal", "break-all", "keep-all"];
function wordBreak (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$95);
  }

  return false;
}
var properties$135 = ["word-break"];

var wordBreak$1 = Object.freeze({
  default: wordBreak,
  properties: properties$135
});

function wordSpacing (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isLengthPercentage(node) || node.value.toLowerCase() === "normal";
  }

  return false;
}
var properties$136 = ["word-spacing"];

var wordSpacing$1 = Object.freeze({
  default: wordSpacing,
  properties: properties$136
});

var keywords$96 = ["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr"];
function writingMode (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$96);
  }

  return false;
}
var properties$137 = ["-webkit-writing-mode", "writing-mode"];

var writingMode$1 = Object.freeze({
  default: writingMode,
  properties: properties$137
});

var keywords$97 = ["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr", "lr-tb", "tb-rl", "tb-lr"];
function msWritingMode (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isCaseInsensitiveKeyword(node, keywords$97);
  }

  return false;
}
var properties$138 = ["-ms-writing-mode"];

var msWritingMode$1 = Object.freeze({
  default: msWritingMode,
  properties: properties$138
});

function zIndex (parsed) {
  if (parsed.nodes.length === 1) {
    var node = parsed.nodes[0];
    return isInteger(node) || node.value.toLowerCase() === "auto";
  }

  return false;
}
var properties$139 = ["z-index"];

var zIndex$1 = Object.freeze({
  default: zIndex,
  properties: properties$139
});

var validators = [msOverflowStyle$1, mozAppearance$1, mozFloatEdge$1, mozForceBrokenImageIcon$1, mozOrient$1, mozStackSizing$1, mozTextBlink$1, mozUserFocus$1, mozUserInput$1, mozUserModify$1, mozWindowShadow$1, webkitBorderBeforeColor$1, webkitBorderBeforeStyle$1, webkitBorderBeforeWidth$1, webkitMaskRepeat, webkitMaskRepeatX$1, webkitTapHighlightColor$1, webkitTextStrokeWidth$1, webkitTouchCallout$1, alignContent$1, msFlexLinePack$1, msFlexAlign$1, alignItems$1, alignSelf$1, msFlexItemAlign$1, animationDelay$1, animationDirection$1, animationFillMode$1, animationName$1, animationPlayState$1, animationTimingFunction$1, appearance$1, backfaceVisibility$1, backgroundAttachment$1, backgroundBlendMode$1, backgroundClip$1, borderBottomLeftRadius$1, borderBottomStyle$1, borderBottomWidth$1, borderCollapse$1, borderColor$1, bottom$1, boxAlign$1, boxDecorationBreak$1, boxDirection$1, boxFlex$1, boxLines$1, boxOrient$1, boxPack$1, boxSizing$1, boxSuppress$1, pageBreakAfter$1, webkitColumnBreakInside$1, captionSide$1, clear$1, columnCount$1, columnFill$1, columnGap$1, columnSpan$1, columnWidth$1, direction$1, display$1, displayInside$1, displayList$1, displayOutside$1, emptyCells$1, mozBoxOrient$1, mozBoxDirection$1, flexDirection$1, flexWrap$1, float$1, fontKerning$1, fontLanguageOverride$1, fontSize$1, fontSizeAdjust$1, fontStretch$1, fontStyle$1, fontVariantCaps$1, fontVariantPosition$1, fontWeight$1, gridColumnGap$1, gridTemplateAreas$1, hyphens$1, imageRendering$1, msInterpolationMode$1, imeMode$1, initialLetterAlign$1, isolation$1, mozBoxPack$1, justifyContent$1, msFlexPack$1, letterSpacing$1, lineBreak$1, lineHeight$1, listStylePosition$1, maskComposite$1, maskMode$1, maskType$1, maxBlockSize$1, minBlockSize$1, mixBlendMode$1, objectFit$1, outlineColor$1, outlineStyle$1, overflow$1, overflowClipBox$1, overflowWrap$1, paddingBlockEnd$1, pageBreakInside$1, perspective$1, pointerEvents$1, position$1, resize$1, rubyAlign$1, rubyMerge$1, rubyPosition$1, scrollBehavior$1, scrollSnapType$1, tabSize$1, tableLayout$1, textAlign$1, textAlignLast$1, textDecorationStyle$1, textOrientation$1, textRendering$1, textSizeAdjust$1, textTransform$1, transformBox$1, transformStyle$1, unicodeBidi$1, userSelect$1, verticalAlign$1, visibility$1, whiteSpace$1, willChange$1, wordBreak$1, wordSpacing$1, writingMode$1, msWritingMode$1, zIndex$1];

var cssGlobals = ["inherit", "initial", "revert", "unset"];
function cssValues(property, value) {
  var parsed = void 0;

  if (typeof value === 'string') {
    parsed = valueParser(value);
  }

  var first = parsed.nodes[0];

  if (parsed.nodes.length === 1 && (isCaseInsensitiveKeyword(first, cssGlobals) || isVar(first))) {
    return true;
  }

  return validators.some(function (validator) {
    if (!~validator.properties.indexOf(property)) {
      return;
    }

    return validator.default(parsed);
  });
}

export default cssValues;