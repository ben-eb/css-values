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

var msOverflowStyle = {
  properties: ["-ms-overflow-style"],
  fn: isKeywordFactory(["auto", "none", "scrollbar", "-ms-autohiding-scrollbar"])
};

var mozAppearance = {
  properties: ["-moz-appearance"],
  fn: isKeywordFactory(["none", "button", "button-arrow-down", "button-arrow-next", "button-arrow-previous", "button-arrow-up", "button-bevel", "button-focus", "caret", "checkbox", "checkbox-container", "checkbox-label", "checkmenuitem", "dualbutton", "groupbox", "listbox", "listitem", "menuarrow", "menubar", "menucheckbox", "menuimage", "menuitem", "menuitemtext", "menulist", "menulist-button", "menulist-text", "menulist-textfield", "menupopup", "menuradio", "menuseparator", "meterbar", "meterchunk", "progressbar", "progressbar-vertical", "progresschunk", "progresschunk-vertical", "radio", "radio-container", "radio-label", "radiomenuitem", "range", "range-thumb", "resizer", "resizerpanel", "scale-horizontal", "scalethumbend", "scalethumb-horizontal", "scalethumbstart", "scalethumbtick", "scalethumb-vertical", "scale-vertical", "scrollbarbutton-down", "scrollbarbutton-left", "scrollbarbutton-right", "scrollbarbutton-up", "scrollbarthumb-horizontal", "scrollbarthumb-vertical", "scrollbartrack-horizontal", "scrollbartrack-vertical", "searchfield", "separator", "sheet", "spinner", "spinner-downbutton", "spinner-textfield", "spinner-upbutton", "splitter", "statusbar", "statusbarpanel", "tab", "tabpanel", "tabpanels", "tab-scroll-arrow-back", "tab-scroll-arrow-forward", "textfield", "textfield-multiline", "toolbar", "toolbarbutton", "toolbarbutton-dropdown", "toolbargripper", "toolbox", "tooltip", "treeheader", "treeheadercell", "treeheadersortarrow", "treeitem", "treeline", "treetwisty", "treetwistyopen", "treeview", "-moz-mac-unified-toolbar", "-moz-win-borderless-glass", "-moz-win-browsertabbar-toolbox", "-moz-win-communicationstext", "-moz-win-communications-toolbox", "-moz-win-exclude-glass", "-moz-win-glass", "-moz-win-mediatext", "-moz-win-media-toolbox", "-moz-window-button-box", "-moz-window-button-box-maximized", "-moz-window-button-close", "-moz-window-button-maximize", "-moz-window-button-minimize", "-moz-window-button-restore", "-moz-window-frame-bottom", "-moz-window-frame-left", "-moz-window-frame-right", "-moz-window-titlebar", "-moz-window-titlebar-maximized"])
};

var isUrl = (function (node) {
  return isFunction(node, 'url');
});

var mozBinding = {
  properties: ["-moz-binding", "list-style-image"],
  fn: function mozBinding(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isUrl(node) || isKeyword(node, "none");
    }

    return false;
  }
};

var mozFloatEdge = {
  properties: ["-moz-float-edge"],
  fn: isKeywordFactory(["border-box", "content-box", "margin-box", "padding-box"])
};

var isInteger = (function (_ref) {
    var type = _ref.type;
    var value = _ref.value;

    if (type !== 'word') {
        return false;
    }
    var int = unit(value);
    return int && !~value.indexOf('.') && !int.unit;
});

var mozForceBrokenImageIcon = {
  properties: ["-moz-force-broken-image-icon", "box-flex-group", "box-ordinal-group", "order", "orphans", "widows"],
  fn: function mozForceBrokenImageIcon(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isInteger(node);
    }

    return false;
  }
};

var mozOrient = {
  properties: ["-moz-orient"],
  fn: isKeywordFactory(["inline", "block", "horizontal", "vertical"])
};

var mozStackSizing = {
  properties: ["-moz-stack-sizing"],
  fn: isKeywordFactory(["ignore", "stretch-to-fit"])
};

var mozTextBlink = {
  properties: ["-moz-text-blink"],
  fn: isKeywordFactory(["none", "blink"])
};

var mozUserFocus = {
  properties: ["-moz-user-focus"],
  fn: isKeywordFactory(["ignore", "normal", "select-after", "select-before", "select-menu", "select-same", "select-all", "none"])
};

var mozUserInput = {
  properties: ["-moz-user-input"],
  fn: isKeywordFactory(["none", "enabled", "disabled"])
};

var mozUserModify = {
  properties: ["-moz-user-modify"],
  fn: isKeywordFactory(["read-only", "read-write", "write-only"])
};

var mozWindowShadow = {
  properties: ["-moz-window-shadow"],
  fn: isKeywordFactory(["default", "menu", "tooltip", "sheet", "none"])
};

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

var webkitBorderBeforeColor = {
  properties: ["-webkit-border-before-color", "-webkit-text-fill-color", "-webkit-text-stroke-color", "background-color", "border-block-end-color", "border-block-start-color", "border-bottom-color", "border-inline-end-color", "border-inline-start-color", "border-left-color", "border-right-color", "border-top-color", "color", "column-rule-color", "text-decoration-color", "text-emphasis-color"],
  fn: function webkitBorderBeforeColor(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isColor(node);
    }

    return false;
  }
};

var brStyles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

var isBrStyle = (function (node) {
    return isKeyword(node, brStyles);
});

var isSpace = (function (_ref) {
    var type = _ref.type;

    return type === 'space';
});

var webkitBorderBeforeStyle = {
  properties: ["-webkit-border-before-style", "border-block-end-style", "border-block-start-style", "border-inline-end-style", "border-inline-start-style", "border-style"],
  fn: function webkitBorderBeforeStyle(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBrStyle(node) && !isVariable(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
  }
};

/*
 * See the specification for more details:
 * https://drafts.csswg.org/css-values-3/#angles
 */

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

var webkitBorderBeforeWidth = {
  properties: ["-webkit-border-before-width", "border-block-end-width", "border-block-start-width", "border-inline-end-width", "border-inline-start-width", "border-width"],
  fn: function webkitBorderBeforeWidth(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBrWidth(node) && !isVariable(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
  }
};

var attachments = ['scroll', 'fixed', 'local'];

var isAttachment = (function (node) {
    return isKeyword(node, attachments);
});

var webkitMaskAttachment = {
  properties: ["-webkit-mask-attachment", "background-attachment"],
  fn: function webkitMaskAttachment(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isAttachment(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

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

var webkitMaskRepeat = {
  properties: ["-webkit-mask-repeat", "background-repeat", "mask-repeat"],
  fn: isRepeatStyle
};

var webkitMaskRepeatX = {
  properties: ["-webkit-mask-repeat-x", "-webkit-mask-repeat-y"],
  fn: isKeywordFactory(["repeat", "no-repeat", "space", "round"])
};

var webkitTapHighlightColor = {
  properties: ["-webkit-tap-highlight-color"],
  fn: function webkitTapHighlightColor(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isColor(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var webkitTextStrokeWidth = {
  properties: ["-webkit-text-stroke-width", "outline-offset"],
  fn: function webkitTextStrokeWidth(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node);
    }

    return false;
  }
};

var webkitTouchCallout = {
  properties: ["-webkit-touch-callout"],
  fn: isKeywordFactory(["default", "none"])
};

var alignContent = {
  properties: ["-webkit-align-content", "align-content"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "stretch"])
};

var msFlexLinePack = {
  properties: ["-ms-flex-line-pack"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "stretch", "start", "end", "justify", "distribute"])
};

var msFlexAlign = {
  properties: ["-webkit-box-align", "-moz-box-align", "-ms-flex-align"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"])
};

var alignItems = {
  properties: ["-webkit-align-items", "-ms-grid-row-align", "align-items"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "baseline", "stretch"])
};

var alignSelf = {
  properties: ["-webkit-align-self", "align-self"],
  fn: isKeywordFactory(["auto", "flex-start", "flex-end", "center", "baseline", "stretch"])
};

var msFlexItemAlign = {
  properties: ["-ms-flex-item-align"],
  fn: isKeywordFactory(["auto", "flex-start", "flex-end", "center", "baseline", "stretch", "start", "end"])
};

var animationDelay = {
  properties: ["animation-delay", "animation-duration", "transition-delay", "transition-duration"],
  fn: function animationDelay(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isTime(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var singleAnimationDirections = ['normal', 'reverse', 'alternate', 'alternate-reverse'];

var isSingleAnimationDirection = (function (node) {
    return isKeyword(node, singleAnimationDirections);
});

var animationDirection = {
  properties: ["animation-direction"],
  fn: function animationDirection(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleAnimationDirection(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var singleAnimationFillModes = ['none', 'forwards', 'backwards', 'both'];

var isSingleAnimationFillMode = (function (node) {
    return isKeyword(node, singleAnimationFillModes);
});

var animationFillMode = {
  properties: ["animation-fill-mode"],
  fn: function animationFillMode(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleAnimationFillMode(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var value = ['infinite'];

var isSingleAnimationIterationCount = (function (node) {
    return isKeyword(node, value) || isNumber(node);
});

var animationIterationCount = {
  properties: ["animation-iteration-count"],
  fn: function animationIterationCount(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleAnimationIterationCount(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

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

var animationName = {
  properties: ["animation-name"],
  fn: function animationName(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleAnimationName(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var singleAnimationPlayStates = ['running', 'paused'];

var isSingleAnimationPlayState = (function (node) {
    return isKeyword(node, singleAnimationPlayStates);
});

var animationPlayState = {
  properties: ["animation-play-state"],
  fn: function animationPlayState(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleAnimationPlayState(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

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

var animationTimingFunction = {
  properties: ["animation-timing-function", "transition-timing-function"],
  fn: function animationTimingFunction(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isSingleTransitionTimingFunction(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var appearance = {
  properties: ["-webkit-appearance", "-moz-appearance", "appearance"],
  fn: isKeywordFactory(["auto", "none"])
};

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

var backdropFilter = {
  properties: ["-webkit-backdrop-filter", "backdrop-filter", "-webkit-filter", "filter"],
  fn: function backdropFilter(parsed) {
    if (isFilterFunctionList(parsed)) {
      return true;
    }

    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isKeyword(node, "none");
    }

    return false;
  }
};

var backfaceVisibility = {
  properties: ["-webkit-backface-visibility", "-moz-backface-visibility", "backface-visibility"],
  fn: isKeywordFactory(["visible", "hidden"])
};

var blendValues = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

var isBlendMode = (function (node) {
    return isKeyword(node, blendValues);
});

var backgroundBlendMode = {
  properties: ["background-blend-mode"],
  fn: function backgroundBlendMode(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBlendMode(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var boxes = ['border-box', 'padding-box', 'content-box'];

var isBox = (function (node) {
    return isKeyword(node, boxes);
});

var backgroundClip = {
  properties: ["background-clip", "background-origin"],
  fn: function backgroundClip(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBox(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

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

var left$1 = 'left';
var center = 'center';
var right$1 = 'right';
var top$1 = 'top';
var bottom$1 = 'bottom';

var horizontals$1 = [left$1, right$1, center];
var verticals$1 = [top$1, bottom$1, center];

function isKeywordOrVar(node, keywords) {
    return isKeyword(node, keywords) || isVariable(node);
}

function isLengthPercentageOrVar(node) {
    return isLengthPercentage(node) || isVariable(node);
}

function validateGroup(group) {
    var length = group.length;

    if (length === 1) {
        if (!isKeywordOrVar(group[0], [left$1, center, right$1, top$1, bottom$1]) && !isLengthPercentage(group[0])) {
            return false;
        }
    }
    if (length === 3) {
        if (!isSpace(group[1])) {
            return false;
        }
        if (isKeywordOrVar(group[0], horizontals$1) && isKeywordOrVar(group[2], verticals$1) || isKeywordOrVar(group[0], verticals$1) && isKeywordOrVar(group[2], horizontals$1)) {
            return true;
        }
        if (!isKeywordOrVar(group[0], horizontals$1) && !isLengthPercentage(group[0])) {
            return false;
        }
        if (!isKeywordOrVar(group[2], verticals$1) && !isLengthPercentage(group[2])) {
            return false;
        }
    }
    if (length >= 5 && length <= 7) {
        if (isKeywordOrVar(group[0], [left$1, right$1]) && isSpace(group[1]) && isLengthPercentageOrVar(group[2]) && isSpace(group[3]) && isKeywordOrVar(group[4], verticals$1)) {
            if (group[6] && isSpace(group[5]) && (!isLengthPercentageOrVar(group[6]) || group[4].value === center)) {
                return false;
            }
            return true;
        }
        if (isKeywordOrVar(group[0], [top$1, bottom$1]) && isSpace(group[1]) && isLengthPercentageOrVar(group[2]) && isSpace(group[3]) && isKeywordOrVar(group[4], horizontals$1)) {
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

function isElement(node) {
    if (!isFunction(node, 'element')) {
        return false;
    }
    if (node.nodes.length !== 1) {
        return false;
    }
    var _node$nodes$ = node.nodes[0];
    var type = _node$nodes$.type;
    var value = _node$nodes$.value;

    return value[0] === '#' && type === 'word';
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

var top = 'top';
var right = 'right';
var bottom = 'bottom';
var left = 'left';

var verticals = [top, bottom];
var horizontals = [right, left];
var directions = [].concat(horizontals, verticals);

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
                return !group[4] && isKeyword(group[2], directions) || isKeyword(group[2], horizontals) && isKeyword(group[4], verticals) || isKeyword(group[2], verticals) && isKeyword(group[4], horizontals);
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

function isAt(_ref2) {
    var value = _ref2.value;

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

var backgroundImage = {
  properties: ["background-image"],
  fn: function backgroundImage(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBgImage(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var backgroundPosition = {
  properties: ["background-position", "mask-position"],
  fn: isPositionFactory(true)
};

// [ &lt;length-percentage&gt; | auto ]{1,2} | cover | contain

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

var backgroundSize = {
  properties: ["background-size", "mask-size"],
  fn: isBgSize
};

var borderBottomLeftRadius = {
  properties: ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"],
  fn: function borderBottomLeftRadius(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isLengthPercentage(node) && !isVariable(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 3;
  }
};

var borderBottomStyle = {
  properties: ["border-bottom-style", "border-left-style", "border-right-style", "border-top-style", "column-rule-style"],
  fn: function borderBottomStyle(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isBrStyle(node);
    }

    return false;
  }
};

var borderBottomWidth = {
  properties: ["border-bottom-width", "border-left-width", "border-right-width", "border-top-width", "column-rule-width", "outline-width"],
  fn: function borderBottomWidth(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isBrWidth(node);
    }

    return false;
  }
};

var borderCollapse = {
  properties: ["border-collapse"],
  fn: isKeywordFactory(["collapse", "separate"])
};

var borderColor = {
  properties: ["border-color"],
  fn: function borderColor(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isColor(node) && !isVariable(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
  }
};

var borderImageSource = {
  properties: ["border-image-source"],
  fn: function borderImageSource(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isImage(node) || isKeyword(node, "none");
    }

    return false;
  }
};

var bottom$2 = {
  properties: ["bottom", "left", "-webkit-margin-after", "margin-block-end", "-webkit-margin-before", "margin-block-start", "margin-bottom", "-webkit-margin-end", "-moz-margin-end", "margin-inline-end", "-webkit-margin-start", "-moz-margin-start", "margin-inline-start", "margin-left", "margin-right", "margin-top", "offset-block-end", "offset-block-start", "offset-inline-end", "offset-inline-start", "right", "top"],
  fn: function bottom(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLengthPercentage(node) || isKeyword(node, "auto");
    }

    return false;
  }
};

var boxAlign = {
  properties: ["box-align"],
  fn: isKeywordFactory(["start", "center", "end", "baseline", "stretch"])
};

var boxDecorationBreak = {
  properties: ["-webkit-box-decoration-break", "box-decoration-break"],
  fn: isKeywordFactory(["slice", "clone"])
};

var boxDirection = {
  properties: ["box-direction"],
  fn: isKeywordFactory(["normal", "reverse", "inherit"])
};

var boxFlex = {
  properties: ["box-flex", "flex-grow", "flex-shrink", "opacity", "shape-image-threshold"],
  fn: function boxFlex(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isNumber(node);
    }

    return false;
  }
};

var boxLines = {
  properties: ["box-lines"],
  fn: isKeywordFactory(["single", "multiple"])
};

var boxOrient = {
  properties: ["box-orient"],
  fn: isKeywordFactory(["horizontal", "vertical", "inline-axis", "block-axis", "inherit"])
};

var boxPack = {
  properties: ["box-pack"],
  fn: isKeywordFactory(["start", "center", "end", "justify"])
};

var boxSizing = {
  properties: ["-webkit-box-sizing", "-moz-box-sizing", "box-sizing"],
  fn: isKeywordFactory(["content-box", "border-box"])
};

var boxSuppress = {
  properties: ["box-suppress"],
  fn: isKeywordFactory(["show", "discard", "hide"])
};

var pageBreakAfter = {
  properties: ["page-break-after", "page-break-before"],
  fn: isKeywordFactory(["auto", "always", "avoid", "left", "right"])
};

var webkitColumnBreakInside = {
  properties: ["-webkit-column-break-inside", "page-break-inside", "break-inside"],
  fn: isKeywordFactory(["auto", "avoid", "avoid-page", "avoid-column", "avoid-region"])
};

var captionSide = {
  properties: ["caption-side"],
  fn: isKeywordFactory(["top", "bottom", "block-start", "block-end", "inline-start", "inline-end"])
};

var clear = {
  properties: ["clear"],
  fn: isKeywordFactory(["none", "left", "right", "both", "inline-start", "inline-end"])
};

var columnCount = {
  properties: ["-webkit-column-count", "-moz-column-count", "column-count"],
  fn: function columnCount(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isNumber(node) || isKeyword(node, "auto");
    }

    return false;
  }
};

var columnFill = {
  properties: ["-webkit-column-fill", "-moz-column-fill", "column-fill"],
  fn: isKeywordFactory(["auto", "balance"])
};

var columnGap = {
  properties: ["-webkit-column-gap", "-moz-column-gap", "column-gap"],
  fn: function columnGap(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isKeyword(node, "normal");
    }

    return false;
  }
};

var columnSpan = {
  properties: ["-webkit-column-span", "-moz-column-span", "column-span"],
  fn: isKeywordFactory(["none", "all"])
};

var columnWidth = {
  properties: ["-webkit-column-width", "-moz-column-width", "column-width", "marker-offset"],
  fn: function columnWidth(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isKeyword(node, "auto");
    }

    return false;
  }
};

var direction = {
  properties: ["direction"],
  fn: isKeywordFactory(["ltr", "rtl"])
};

var display = {
  properties: ["display"],
  fn: isKeywordFactory(["none", "inline", "block", "list-item", "inline-list-item", "inline-block", "inline-table", "table", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row", "table-row-group", "flex", "inline-flex", "grid", "inline-grid", "run-in", "ruby", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container", "contents", "-webkit-box", "-webkit-flex", "-moz-box", "-ms-flexbox", "-webkit-inline-box", "-webkit-inline-flex", "-moz-inline-box", "-ms-inline-flexbox", "-ms-grid", "-ms-inline-grid"])
};

var displayInside = {
  properties: ["display-inside"],
  fn: isKeywordFactory(["auto", "block", "table", "flex", "grid", "ruby"])
};

var displayList = {
  properties: ["display-list"],
  fn: isKeywordFactory(["none", "list-item"])
};

var displayOutside = {
  properties: ["display-outside"],
  fn: isKeywordFactory(["block-level", "inline-level", "run-in", "contents", "none", "table-row-group", "table-header-group", "table-footer-group", "table-row", "table-cell", "table-column-group", "table-column", "table-caption", "ruby-base", "ruby-text", "ruby-base-container", "ruby-text-container"])
};

var emptyCells = {
  properties: ["empty-cells"],
  fn: isKeywordFactory(["show", "hide"])
};

var mozBoxOrient = {
  properties: ["-webkit-box-orient", "-moz-box-orient"],
  fn: isKeywordFactory(["row", "row-reverse", "column", "column-reverse", "horizontal", "vertical"])
};

var mozBoxDirection = {
  properties: ["-webkit-box-direction", "-moz-box-direction"],
  fn: isKeywordFactory(["row", "row-reverse", "column", "column-reverse", "normal", "reverse"])
};

var flexDirection = {
  properties: ["-webkit-flex-direction", "-ms-flex-direction", "flex-direction"],
  fn: isKeywordFactory(["row", "row-reverse", "column", "column-reverse"])
};

var flexWrap = {
  properties: ["-webkit-flex-wrap", "-ms-flex-wrap", "flex-wrap"],
  fn: isKeywordFactory(["nowrap", "wrap", "wrap-reverse"])
};

var float = {
  properties: ["float"],
  fn: isKeywordFactory(["left", "right", "none", "inline-start", "inline-end"])
};

var fontKerning = {
  properties: ["-webkit-font-kerning", "-moz-font-kerning", "font-kerning"],
  fn: isKeywordFactory(["auto", "normal", "none"])
};

var fontLanguageOverride = {
  properties: ["-webkit-font-language-override", "-moz-font-language-override", "font-language-override"],
  fn: function fontLanguageOverride(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isString(node) || isKeyword(node, "normal");
    }

    return false;
  }
};

var absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];

var isAbsoluteSize = (function (node) {
    return isKeyword(node, absoluteSizes);
});

var relativeSizes = ['larger', 'smaller'];

var isRelativeSize = (function (node) {
    return isKeyword(node, relativeSizes);
});

var fontSize = {
  properties: ["font-size"],
  fn: function fontSize(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isAbsoluteSize(node) || isRelativeSize(node) || isLengthPercentage(node);
    }

    return false;
  }
};

var fontSizeAdjust = {
  properties: ["font-size-adjust"],
  fn: function fontSizeAdjust(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isNumber(node) || isKeyword(node, "none");
    }

    return false;
  }
};

var fontStretch = {
  properties: ["font-stretch"],
  fn: isKeywordFactory(["normal", "ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded"])
};

var fontStyle = {
  properties: ["font-style"],
  fn: isKeywordFactory(["normal", "italic", "oblique"])
};

var fontVariantCaps = {
  properties: ["font-variant-caps"],
  fn: isKeywordFactory(["normal", "small-caps", "all-small-caps", "petite-caps", "all-petite-caps", "unicase", "titling-caps"])
};

var fontVariantPosition = {
  properties: ["font-variant-position"],
  fn: isKeywordFactory(["normal", "sub", "super"])
};

var fontWeight = {
  properties: ["font-weight"],
  fn: isKeywordFactory(["normal", "bold", "bolder", "lighter", "100", "200", "300", "400", "500", "600", "700", "800", "900"])
};

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

var gridAutoColumns = {
  properties: ["grid-auto-columns", "grid-auto-rows"],
  fn: function gridAutoColumns(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isTrackSize(node);
    }

    return false;
  }
};

var gridColumnGap = {
  properties: ["grid-column-gap", "grid-row-gap", "motion-offset", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "shape-margin"],
  fn: function gridColumnGap(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLengthPercentage(node);
    }

    return false;
  }
};

var gridTemplateAreas = {
  properties: ["grid-template-areas"],
  fn: function gridTemplateAreas(parsed) {
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
  }
};

var hyphens = {
  properties: ["-webkit-hyphens", "-moz-hyphens", "-ms-hyphens", "hyphens"],
  fn: isKeywordFactory(["none", "manual", "auto"])
};

var imageRendering = {
  properties: ["image-rendering"],
  fn: isKeywordFactory(["auto", "crisp-edges", "pixelated", "-webkit-optimize-contrast", "-moz-crisp-edges", "-o-pixelated"])
};

var msInterpolationMode = {
  properties: ["-ms-interpolation-mode"],
  fn: isKeywordFactory(["auto", "crisp-edges", "pixelated", "nearest-neighbor"])
};

var imeMode = {
  properties: ["ime-mode"],
  fn: isKeywordFactory(["auto", "normal", "active", "inactive", "disabled"])
};

var initialLetterAlign = {
  properties: ["initial-letter-align"],
  fn: isKeywordFactory(["auto", "alphabetic", "hanging", "ideographic"])
};

var isolation = {
  properties: ["isolation"],
  fn: isKeywordFactory(["auto", "isolate"])
};

var mozBoxPack = {
  properties: ["-webkit-box-pack", "-moz-box-pack"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify"])
};

var justifyContent = {
  properties: ["-webkit-justify-content", "justify-content"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around"])
};

var msFlexPack = {
  properties: ["-ms-flex-pack"],
  fn: isKeywordFactory(["flex-start", "flex-end", "center", "space-between", "space-around", "start", "end", "justify", "distribute"])
};

var letterSpacing = {
  properties: ["letter-spacing"],
  fn: function letterSpacing(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isKeyword(node, "normal");
    }

    return false;
  }
};

var lineBreak = {
  properties: ["line-break"],
  fn: isKeywordFactory(["auto", "loose", "normal", "strict"])
};

var lineHeight = {
  properties: ["line-height"],
  fn: function lineHeight(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isNumber(node) || isLengthPercentage(node) || isKeyword(node, "normal");
    }

    return false;
  }
};

var listStylePosition = {
  properties: ["list-style-position"],
  fn: isKeywordFactory(["inside", "outside"])
};

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

var listStyleType = {
  properties: ["list-style-type"],
  fn: function listStyleType(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isCounterStyle(node) || isString(node) || isKeyword(node, "none");
    }

    return false;
  }
};

var compositingOperators = ['add', 'subtract', 'intersect', 'exclude'];

var isCompositingOperator = (function (node) {
    return isKeyword(node, compositingOperators);
});

var maskComposite = {
  properties: ["mask-composite"],
  fn: function maskComposite(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isCompositingOperator(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var maskingModes = ['alpha', 'luminance', 'match-source'];

var isMaskingMode = (function (node) {
    return isKeyword(node, maskingModes);
});

var maskMode = {
  properties: ["mask-mode"],
  fn: function maskMode(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isMaskingMode(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var geometryBoxes = ['margin-box', 'fill-box', 'stroke-box', 'view-box'];

var nonStandardKeywords = ['content', 'padding', 'border'];

var isGeometryBox = (function (node) {
    return isBox(node) || isKeyword(node, geometryBoxes) || isKeyword(node, nonStandardKeywords);
});

var maskOrigin = {
  properties: ["mask-origin"],
  fn: function maskOrigin(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isGeometryBox(node) && !isVariable(node) || !even && !isComma(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0;
  }
};

var maskType = {
  properties: ["mask-type"],
  fn: isKeywordFactory(["luminance", "alpha"])
};

var keywords$2 = ["none", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];
var maxBlockSize = {
  properties: ["max-block-size", "max-height", "max-inline-size", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width"],
  fn: function maxBlockSize(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLengthPercentage(node) || isKeyword(node, keywords$2);
    }

    return false;
  }
};

var mixBlendMode = {
  properties: ["mix-blend-mode"],
  fn: function mixBlendMode(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isBlendMode(node);
    }

    return false;
  }
};

var objectFit = {
  properties: ["-o-object-fit", "object-fit"],
  fn: isKeywordFactory(["fill", "contain", "cover", "none", "scale-down"])
};

var objectPosition = {
  properties: ["object-position", "perspective-origin", "scroll-snap-destination"],
  fn: isPositionFactory(false)
};

var outlineColor = {
  properties: ["outline-color"],
  fn: function outlineColor(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isColor(node) || isKeyword(node, "invert");
    }

    return false;
  }
};

var outlineStyle = {
  properties: ["outline-style"],
  fn: function outlineStyle(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isBrStyle(node) || isKeyword(node, "auto");
    }

    return false;
  }
};

var overflow = {
  properties: ["overflow", "overflow-x", "overflow-y"],
  fn: isKeywordFactory(["visible", "hidden", "scroll", "auto"])
};

var overflowClipBox = {
  properties: ["overflow-clip-box"],
  fn: isKeywordFactory(["padding-box", "content-box"])
};

var overflowWrap = {
  properties: ["overflow-wrap", "word-wrap"],
  fn: isKeywordFactory(["normal", "break-word"])
};

var pageBreakInside = {
  properties: ["page-break-inside"],
  fn: isKeywordFactory(["auto", "avoid"])
};

var perspective = {
  properties: ["-webkit-perspective", "-moz-perspective", "perspective"],
  fn: function perspective(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isKeyword(node, "none");
    }

    return false;
  }
};

var pointerEvents = {
  properties: ["pointer-events"],
  fn: isKeywordFactory(["auto", "none", "visiblePainted", "visibleFill", "visibleStroke", "visible", "painted", "fill", "stroke", "all", "inherit"])
};

var position = {
  properties: ["position"],
  fn: isKeywordFactory(["static", "relative", "absolute", "sticky", "fixed", "-webkit-sticky"])
};

var resize = {
  properties: ["resize"],
  fn: isKeywordFactory(["none", "both", "horizontal", "vertical"])
};

var rubyAlign = {
  properties: ["ruby-align"],
  fn: isKeywordFactory(["start", "center", "space-between", "space-around"])
};

var rubyMerge = {
  properties: ["ruby-merge"],
  fn: isKeywordFactory(["separate", "collapse", "auto"])
};

var rubyPosition = {
  properties: ["ruby-position"],
  fn: isKeywordFactory(["over", "under", "inter-character"])
};

var scrollBehavior = {
  properties: ["scroll-behavior"],
  fn: isKeywordFactory(["auto", "smooth"])
};

var scrollSnapCoordinate = {
  properties: ["-webkit-scroll-snap-coordinate", "-ms-scroll-snap-coordinate", "scroll-snap-coordinate"],
  fn: function scrollSnapCoordinate(parsed) {
    if (isPositionFactory(true)(parsed)) {
      return true;
    }

    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isKeyword(node, "none");
    }

    return false;
  }
};

var scrollSnapType = {
  properties: ["-webkit-scroll-snap-type", "-ms-scroll-snap-type", "scroll-snap-type", "scroll-snap-type-x", "scroll-snap-type-y"],
  fn: isKeywordFactory(["none", "mandatory", "proximity"])
};

var tabSize = {
  properties: ["tab-size"],
  fn: function tabSize(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isInteger(node) || isLength(node);
    }

    return false;
  }
};

var tableLayout = {
  properties: ["table-layout"],
  fn: isKeywordFactory(["auto", "fixed"])
};

var textAlign = {
  properties: ["text-align"],
  fn: isKeywordFactory(["start", "end", "left", "right", "center", "justify", "match-parent"])
};

var textAlignLast = {
  properties: ["-moz-text-align-last", "text-align-last"],
  fn: isKeywordFactory(["auto", "start", "end", "left", "right", "center", "justify"])
};

var textDecorationStyle = {
  properties: ["-webkit-text-decoration-style", "-moz-text-decoration-style", "text-decoration-style"],
  fn: isKeywordFactory(["solid", "double", "dotted", "dashed", "wavy"])
};

var textOrientation = {
  properties: ["text-orientation"],
  fn: isKeywordFactory(["mixed", "upright", "sideways"])
};

var textRendering = {
  properties: ["text-rendering"],
  fn: isKeywordFactory(["auto", "optimizeSpeed", "optimizeLegibility", "geometricPrecision"])
};

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

var textShadow = {
  properties: ["text-shadow"],
  fn: function textShadow(parsed) {
    if (isShadowT(parsed)) {
      return true;
    }

    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isKeyword(node, "none");
    }

    return false;
  }
};

var keywords$3 = ["none", "auto"];
var textSizeAdjust = {
  properties: ["-webkit-text-size-adjust", "-moz-text-size-adjust", "-ms-text-size-adjust", "text-size-adjust"],
  fn: function textSizeAdjust(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isPercentage(node) || isKeyword(node, keywords$3);
    }

    return false;
  }
};

var textTransform = {
  properties: ["text-transform"],
  fn: isKeywordFactory(["none", "capitalize", "uppercase", "lowercase", "full-width"])
};

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

var transform = {
  properties: ["-webkit-transform", "-moz-transform", "-ms-transform", "-o-transform", "transform"],
  fn: function transform(parsed) {
    if (isTransformList(parsed)) {
      return true;
    }

    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isKeyword(node, "none");
    }

    return false;
  }
};

var transformBox = {
  properties: ["transform-box"],
  fn: isKeywordFactory(["border-box", "fill-box", "view-box"])
};

var transformStyle = {
  properties: ["-webkit-transform-style", "-moz-transform-style", "transform-style"],
  fn: isKeywordFactory(["flat", "preserve-3d"])
};

var unicodeBidi = {
  properties: ["unicode-bidi"],
  fn: isKeywordFactory(["normal", "embed", "isolate", "bidi-override", "isolate-override", "plaintext"])
};

var userSelect = {
  properties: ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"],
  fn: isKeywordFactory(["auto", "text", "none", "contain", "all"])
};

var keywords$4 = ["baseline", "sub", "super", "text-top", "text-bottom", "middle", "top", "bottom"];
var verticalAlign = {
  properties: ["vertical-align"],
  fn: function verticalAlign(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLengthPercentage(node) || isKeyword(node, keywords$4);
    }

    return false;
  }
};

var visibility = {
  properties: ["visibility"],
  fn: isKeywordFactory(["visible", "hidden", "collapse"])
};

var whiteSpace = {
  properties: ["white-space"],
  fn: isKeywordFactory(["normal", "pre", "nowrap", "pre-wrap", "pre-line"])
};

var animateableFeatures = ['scroll-position', 'contents'];

var isAnimateableFeature = (function (node) {
    return isKeyword(node, animateableFeatures) || isCustomIdent(node);
});

var willChange = {
  properties: ["will-change"],
  fn: function willChange(parsed) {
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
  }
};

var wordBreak = {
  properties: ["word-break"],
  fn: isKeywordFactory(["normal", "break-all", "keep-all"])
};

var wordSpacing = {
  properties: ["word-spacing"],
  fn: function wordSpacing(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLengthPercentage(node) || isKeyword(node, "normal");
    }

    return false;
  }
};

var writingMode = {
  properties: ["-webkit-writing-mode", "writing-mode"],
  fn: isKeywordFactory(["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr"])
};

var msWritingMode = {
  properties: ["-ms-writing-mode"],
  fn: isKeywordFactory(["horizontal-tb", "vertical-rl", "vertical-lr", "sideways-rl", "sideways-lr", "lr-tb", "tb-rl", "tb-lr"])
};

var zIndex = {
  properties: ["z-index"],
  fn: function zIndex(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isInteger(node) || isKeyword(node, "auto");
    }

    return false;
  }
};

var validators = [msOverflowStyle, mozAppearance, mozBinding, mozFloatEdge, mozForceBrokenImageIcon, mozOrient, mozStackSizing, mozTextBlink, mozUserFocus, mozUserInput, mozUserModify, mozWindowShadow, webkitBorderBeforeColor, webkitBorderBeforeStyle, webkitBorderBeforeWidth, webkitMaskAttachment, webkitMaskRepeat, webkitMaskRepeatX, webkitTapHighlightColor, webkitTextStrokeWidth, webkitTouchCallout, alignContent, msFlexLinePack, msFlexAlign, alignItems, alignSelf, msFlexItemAlign, animationDelay, animationDirection, animationFillMode, animationIterationCount, animationName, animationPlayState, animationTimingFunction, appearance, backdropFilter, backfaceVisibility, backgroundBlendMode, backgroundClip, backgroundImage, backgroundPosition, backgroundSize, borderBottomLeftRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, borderImageSource, bottom$2, boxAlign, boxDecorationBreak, boxDirection, boxFlex, boxLines, boxOrient, boxPack, boxSizing, boxSuppress, pageBreakAfter, webkitColumnBreakInside, captionSide, clear, columnCount, columnFill, columnGap, columnSpan, columnWidth, direction, display, displayInside, displayList, displayOutside, emptyCells, mozBoxOrient, mozBoxDirection, flexDirection, flexWrap, float, fontKerning, fontLanguageOverride, fontSize, fontSizeAdjust, fontStretch, fontStyle, fontVariantCaps, fontVariantPosition, fontWeight, gridAutoColumns, gridColumnGap, gridTemplateAreas, hyphens, imageRendering, msInterpolationMode, imeMode, initialLetterAlign, isolation, mozBoxPack, justifyContent, msFlexPack, letterSpacing, lineBreak, lineHeight, listStylePosition, listStyleType, maskComposite, maskMode, maskOrigin, maskType, maxBlockSize, mixBlendMode, objectFit, objectPosition, outlineColor, outlineStyle, overflow, overflowClipBox, overflowWrap, pageBreakInside, perspective, pointerEvents, position, resize, rubyAlign, rubyMerge, rubyPosition, scrollBehavior, scrollSnapCoordinate, scrollSnapType, tabSize, tableLayout, textAlign, textAlignLast, textDecorationStyle, textOrientation, textRendering, textShadow, textSizeAdjust, textTransform, transform, transformBox, transformStyle, unicodeBidi, userSelect, verticalAlign, visibility, whiteSpace, willChange, wordBreak, wordSpacing, writingMode, msWritingMode, zIndex];

var cssGlobals = ["inherit", "initial", "revert", "unset"];
function cssValues(property, value) {
  if (typeof value === 'string') {
    value = valueParser(value);
  }

  var first = value.nodes[0];

  if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVariable(first))) {
    return true;
  }

  return validators.some(function (validator) {
    if (!~validator.properties.indexOf(property)) {
      return;
    }

    return validator.fn(value);
  });
}

export default cssValues;