import valueParser, { unit, walk } from 'postcss-value-parser';
import colors from 'css-color-names';
import endsWith from 'ends-with';

function lowercase(value) {
    return value.toLowerCase();
}

function isKeyword(_ref, values) {
    var type = _ref.type;
    var value = _ref.value;

    return type === 'word' && ~values.map(lowercase).indexOf(lowercase(value));
}

function isFunction(node, value) {
    return node.type === 'function' && node.value.toLowerCase() === value;
}

var isVar = (function (node) {
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
      return isUrl(node) || node.value.toLowerCase() === "none";
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
    return node.type === 'word' && node.value.toLowerCase() === 'currentcolor';
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

      if (even && !isBrStyle(node) && !isVar(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
  }
};

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
    return isLength(node) || isKeyword(node, brWidths);
});

var webkitBorderBeforeWidth = {
  properties: ["-webkit-border-before-width", "border-block-end-width", "border-block-start-width", "border-inline-end-width", "border-inline-start-width", "border-width"],
  fn: function webkitBorderBeforeWidth(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isBrWidth(node) && !isVar(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
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
        } else if (isKeyword(node, multipleValues) || isVar(node)) {
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

      if (even && !isColor(node) && !isVar(node) || !even && !isComma(node)) {
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

var units = ['s', 'ms'];

var isTime = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && ~units.indexOf(int.unit);
});

var animationDelay = {
  properties: ["animation-delay", "animation-duration", "transition-delay", "transition-duration"],
  fn: function animationDelay(parsed) {
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

      if (even && !isSingleAnimationDirection(node) && !isVar(node) || !even && !isComma(node)) {
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

      if (even && !isSingleAnimationFillMode(node) && !isVar(node) || !even && !isComma(node)) {
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

      if (even && !isSingleAnimationIterationCount(node) && !isVar(node) || !even && !isComma(node)) {
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
    return node.type === 'word' && (node.value.toLowerCase() === 'none' || isCustomIdent(node));
});

var animationName = {
  properties: ["animation-name"],
  fn: function animationName(parsed) {
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

      if (even && !isSingleAnimationPlayState(node) && !isVar(node) || !even && !isComma(node)) {
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

      if (even && !isSingleTransitionTimingFunction(node) && !isVar(node) || !even && !isComma(node)) {
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

var angles = ['deg', 'grad', 'rad', 'turn'];

var isAngle = (function (_ref) {
    var value = _ref.value;

    var int = unit(value);
    return int && !endsWith(int.number, '.') && !~int.unit.indexOf('.') && (int.number === '0' || ~angles.indexOf(int.unit));
});

function isNumberOrPercentageFactory(name) {
    return function isNumberOrPercentage(node) {
        if (!isFunction(node, name)) {
            return false;
        }
        var nodes = node.nodes;

        return nodes.length === 1 && (isNumber(nodes[0]) || isPercentage(nodes[0]));
    };
}

var isBrightness = isNumberOrPercentageFactory('brightness');
var isContrast = isNumberOrPercentageFactory('contrast');
var isGrayscale = isNumberOrPercentageFactory('grayscale');
var isInvert = isNumberOrPercentageFactory('invert');
var isOpacity = isNumberOrPercentageFactory('opacity');
var isSepia = isNumberOrPercentageFactory('sepia');
var isSaturate = isNumberOrPercentageFactory('saturate');

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
    return isBlur(node) || isBrightness(node) || isContrast(node) || isDropShadow(node) || isGrayscale(node) || isHueRotate(node) || isInvert(node) || isOpacity(node) || isSepia(node) || isSaturate(node);
}

function isFilterFunctionList(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
        var even = index % 2 === 0;
        if (even && !isFilterFunction(node) && !isVar(node)) {
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
      return node.value.toLowerCase() === "none";
    }

    return false;
  }
};

var backfaceVisibility = {
  properties: ["-webkit-backface-visibility", "-moz-backface-visibility", "backface-visibility"],
  fn: isKeywordFactory(["visible", "hidden"])
};

var attachments = ['scroll', 'fixed', 'local'];

var isAttachment = (function (node) {
    return isKeyword(node, attachments);
});

var backgroundAttachment = {
  properties: ["background-attachment"],
  fn: function backgroundAttachment(parsed) {
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

      if (even && !isBlendMode(node) && !isVar(node) || !even && !isComma(node)) {
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

      if (even && !isBox(node) && !isVar(node) || !even && !isComma(node)) {
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

var left = 'left';
var center = 'center';
var right = 'right';
var top = 'top';
var bottom = 'bottom';

var horizontals = [left, right, center];
var verticals = [top, bottom, center];

function isKeywordOrVar(node, keywords) {
    return isKeyword(node, keywords) || isVar(node);
}

function isLengthPercentageOrVar(node) {
    return isLengthPercentage(node) || isVar(node);
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

var backgroundPosition = {
  properties: ["background-position", "mask-position"],
  fn: isPositionFactory(true)
};

var borderBottomLeftRadius = {
  properties: ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"],
  fn: function borderBottomLeftRadius(parsed) {
    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isLengthPercentage(node) && !isVar(node) || !even && !isSpace(node)) {
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

      if (even && !isColor(node) && !isVar(node) || !even && !isSpace(node)) {
        valid = false;
      }

      return false;
    });
    return valid && parsed.nodes.length % 2 !== 0 && parsed.nodes.length <= 7;
  }
};

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
    var valid = true;
    walk(node.nodes, function (child, index) {
        if (index === 0 && !isCustomIdent(child)) {
            valid = false;
        }
        if (index === 1 && !isComma(child)) {
            valid = false;
        }
        if (index === 2 && !isKeyword(child, ['first', 'start', 'last', 'first-except'])) {
            valid = false;
        }
        return false;
    });
    return valid && (node.nodes.length === 1 || node.nodes.length === 3);
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
    if (!isFunction(node, 'linear-gradient') && !isFunction(node, 'repeating-linear-gradient')) {
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

function isAt(_ref2) {
    var value = _ref2.value;

    return value === at;
}

function isRadialGradient(node) {
    if (!isFunction(node, 'radial-gradient') && !isFunction(node, 'repeating-radial-gradient')) {
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
            if (length === 3 && (firstIsCircle && isLength(group[2]) || firstIsLength && group[2].value === circle || firstIsExtent && isKeyword(group[2], endingShapes) || firstIsEndingShape && isKeyword(group[2], extentKeywords))) {
                return true;
            }
            var firstIsEllipse = group[0].value === ellipse;
            var firstIsLP = isLengthPercentage(group[0]);
            var position4 = isRadialGradientPosition({ nodes: group.slice(4) });
            var position6 = isRadialGradientPosition({ nodes: group.slice(6) });
            if (length > 3 && (firstIsEllipse && isLengthPercentage(group[2]) && isLengthPercentage(group[4]) || firstIsLP && isLengthPercentage(group[2]) && group[4].value === ellipse || firstIsEndingShape && isAt(group[2]) && position4 || firstIsExtent && isAt(group[2]) && position4 || firstIsLength && isAt(group[2]) && position4 || firstIsLP && isLengthPercentage(group[2]) && isAt(group[4]) && position6 || firstIsCircle && isLength(group[2]) && isAt(group[4]) && position6 || firstIsEndingShape && isKeyword(group[2], extentKeywords) && isAt(group[4]) && position6 || firstIsEllipse && isLengthPercentage(group[2]) && isLengthPercentage(group[4]) && isAt(group[6]) && isRadialGradientPosition({ nodes: group.slice(8) }) || firstIsLP && isLengthPercentage(group[2]) && group[4].value === ellipse && isAt(group[6]) && isRadialGradientPosition({ nodes: group.slice(8) }))) {
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

var borderImageSource = {
  properties: ["border-image-source"],
  fn: function borderImageSource(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isImage(node) || node.value.toLowerCase() === "none";
    }

    return false;
  }
};

var bottom$2 = {
  properties: ["bottom", "left", "-webkit-margin-after", "margin-block-end", "-webkit-margin-before", "margin-block-start", "margin-bottom", "-webkit-margin-end", "-moz-margin-end", "margin-inline-end", "-webkit-margin-start", "-moz-margin-start", "margin-inline-start", "margin-left", "margin-right", "margin-top", "offset-block-end", "offset-block-start", "offset-inline-end", "offset-inline-start", "right", "top"],
  fn: function bottom(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isPercentage(node) || node.value.toLowerCase() === "auto";
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
      return isNumber(node) || node.value.toLowerCase() === "auto";
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
      return isLength(node) || node.value.toLowerCase() === "normal";
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
      return isLength(node) || node.value.toLowerCase() === "auto";
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
      return isString(node) || node.value.toLowerCase() === "normal";
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
      return isNumber(node) || node.value.toLowerCase() === "none";
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

var gridColumnGap = {
  properties: ["grid-column-gap", "grid-row-gap", "motion-offset", "shape-margin"],
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

    if (parsed.nodes.length === 1 && node.value.toLowerCase() === "none") {
      return true;
    }

    var valid = true;
    parsed.walk(function (node, index) {
      var even = index % 2 === 0;

      if (even && !isString(node) && !isVar(node) || !even && !isSpace(node)) {
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
      return isLength(node) || node.value.toLowerCase() === "normal";
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
      return isNumber(node) || isLength(node) || isPercentage(node) || node.value.toLowerCase() === "normal";
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
      return isCounterStyle(node) || isString(node) || node.value.toLowerCase() === "none";
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

      if (even && !isCompositingOperator(node) && !isVar(node) || !even && !isComma(node)) {
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

      if (even && !isMaskingMode(node) && !isVar(node) || !even && !isComma(node)) {
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

var keywords$1 = ["none", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];
var maxBlockSize = {
  properties: ["max-block-size", "max-height", "max-inline-size", "max-width"],
  fn: function maxBlockSize(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isPercentage(node) || isKeyword(node, keywords$1);
    }

    return false;
  }
};

var keywords$2 = ["auto", "max-content", "min-content", "fit-content", "fill-available", "-webkit-max-content", "-moz-max-content", "-webkit-min-content", "-moz-min-content", "-webkit-fit-content", "-moz-fit-content", "-webkit-fill-available", "-moz-available"];
var minBlockSize = {
  properties: ["min-block-size", "min-height", "min-inline-size", "min-width"],
  fn: function minBlockSize(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isPercentage(node) || isKeyword(node, keywords$2);
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
      return isColor(node) || node.value.toLowerCase() === "invert";
    }

    return false;
  }
};

var outlineStyle = {
  properties: ["outline-style"],
  fn: function outlineStyle(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isBrStyle(node) || node.value.toLowerCase() === "auto";
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

var paddingBlockEnd = {
  properties: ["padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top"],
  fn: function paddingBlockEnd(parsed) {
    if (parsed.nodes.length === 1) {
      var node = parsed.nodes[0];
      return isLength(node) || isPercentage(node);
    }

    return false;
  }
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
      return isLength(node) || node.value.toLowerCase() === "none";
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
      return node.value.toLowerCase() === "none";
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
      return isPercentage(node) || isLength(node) || isKeyword(node, keywords$4);
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

    if (parsed.nodes.length === 1 && node.value.toLowerCase() === "auto") {
      return true;
    }

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
      return isLengthPercentage(node) || node.value.toLowerCase() === "normal";
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
      return isInteger(node) || node.value.toLowerCase() === "auto";
    }

    return false;
  }
};

var validators = [msOverflowStyle, mozAppearance, mozBinding, mozFloatEdge, mozForceBrokenImageIcon, mozOrient, mozStackSizing, mozTextBlink, mozUserFocus, mozUserInput, mozUserModify, mozWindowShadow, webkitBorderBeforeColor, webkitBorderBeforeStyle, webkitBorderBeforeWidth, webkitMaskRepeat, webkitMaskRepeatX, webkitTapHighlightColor, webkitTextStrokeWidth, webkitTouchCallout, alignContent, msFlexLinePack, msFlexAlign, alignItems, alignSelf, msFlexItemAlign, animationDelay, animationDirection, animationFillMode, animationIterationCount, animationName, animationPlayState, animationTimingFunction, appearance, backdropFilter, backfaceVisibility, backgroundAttachment, backgroundBlendMode, backgroundClip, backgroundPosition, borderBottomLeftRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, borderImageSource, bottom$2, boxAlign, boxDecorationBreak, boxDirection, boxFlex, boxLines, boxOrient, boxPack, boxSizing, boxSuppress, pageBreakAfter, webkitColumnBreakInside, captionSide, clear, columnCount, columnFill, columnGap, columnSpan, columnWidth, direction, display, displayInside, displayList, displayOutside, emptyCells, mozBoxOrient, mozBoxDirection, flexDirection, flexWrap, float, fontKerning, fontLanguageOverride, fontSize, fontSizeAdjust, fontStretch, fontStyle, fontVariantCaps, fontVariantPosition, fontWeight, gridColumnGap, gridTemplateAreas, hyphens, imageRendering, msInterpolationMode, imeMode, initialLetterAlign, isolation, mozBoxPack, justifyContent, msFlexPack, letterSpacing, lineBreak, lineHeight, listStylePosition, listStyleType, maskComposite, maskMode, maskType, maxBlockSize, minBlockSize, mixBlendMode, objectFit, objectPosition, outlineColor, outlineStyle, overflow, overflowClipBox, overflowWrap, paddingBlockEnd, pageBreakInside, perspective, pointerEvents, position, resize, rubyAlign, rubyMerge, rubyPosition, scrollBehavior, scrollSnapCoordinate, scrollSnapType, tabSize, tableLayout, textAlign, textAlignLast, textDecorationStyle, textOrientation, textRendering, textSizeAdjust, textTransform, transformBox, transformStyle, unicodeBidi, userSelect, verticalAlign, visibility, whiteSpace, willChange, wordBreak, wordSpacing, writingMode, msWritingMode, zIndex];

var cssGlobals = ["inherit", "initial", "revert", "unset"];
function cssValues(property, value) {
  if (typeof value === 'string') {
    value = valueParser(value);
  }

  var first = value.nodes[0];

  if (value.nodes.length === 1 && (isKeyword(first, cssGlobals) || isVar(first))) {
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