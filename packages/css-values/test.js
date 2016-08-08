import test from 'ava';
import cssValues from './index.js';

function createCaseInsensitiveTest(property, value) {
    return [{
        property: property,
        value: value,
        valid: true
    }, {
        property: property,
        value: value.toUpperCase(),
        valid: true
    }];
}

/**
 * CSS4 specification link;
 * https://drafts.csswg.org/css-cascade/#defaulting-keywords
 */

var globalKeywords = ['inherit', 'initial', 'revert', 'unset'];

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

function globalTests(property) {
    return globalKeywords.reduce(function (list, value) {
        return [].concat(toConsumableArray(list), toConsumableArray(createCaseInsensitiveTest(property, value)));
    }, [{
        property: property,
        value: "var(--foo)",
        valid: true
    }, {
        property: property,
        value: "VAR(--foo)",
        valid: true
    }]);
}

var property = "-ms-overflow-style";
var msOverflowStyle = [].concat(toConsumableArray(globalTests(property)), toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "scrollbar")), toConsumableArray(createCaseInsensitiveTest(property, "-ms-autohiding-scrollbar")));

var property$1 = "-moz-appearance";
var mozAppearance = [].concat(toConsumableArray(globalTests(property$1)), toConsumableArray(createCaseInsensitiveTest(property$1, "none")), toConsumableArray(createCaseInsensitiveTest(property$1, "button")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-down")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-next")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-previous")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-up")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-bevel")), toConsumableArray(createCaseInsensitiveTest(property$1, "button-focus")), toConsumableArray(createCaseInsensitiveTest(property$1, "caret")), toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox-container")), toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox-label")), toConsumableArray(createCaseInsensitiveTest(property$1, "checkmenuitem")), toConsumableArray(createCaseInsensitiveTest(property$1, "dualbutton")), toConsumableArray(createCaseInsensitiveTest(property$1, "groupbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "listbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "listitem")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuarrow")), toConsumableArray(createCaseInsensitiveTest(property$1, "menubar")), toConsumableArray(createCaseInsensitiveTest(property$1, "menucheckbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuimage")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuitem")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuitemtext")), toConsumableArray(createCaseInsensitiveTest(property$1, "menulist")), toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-button")), toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-text")), toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-textfield")), toConsumableArray(createCaseInsensitiveTest(property$1, "menupopup")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuradio")), toConsumableArray(createCaseInsensitiveTest(property$1, "menuseparator")), toConsumableArray(createCaseInsensitiveTest(property$1, "meterbar")), toConsumableArray(createCaseInsensitiveTest(property$1, "meterchunk")), toConsumableArray(createCaseInsensitiveTest(property$1, "progressbar")), toConsumableArray(createCaseInsensitiveTest(property$1, "progressbar-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "progresschunk")), toConsumableArray(createCaseInsensitiveTest(property$1, "progresschunk-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "radio")), toConsumableArray(createCaseInsensitiveTest(property$1, "radio-container")), toConsumableArray(createCaseInsensitiveTest(property$1, "radio-label")), toConsumableArray(createCaseInsensitiveTest(property$1, "radiomenuitem")), toConsumableArray(createCaseInsensitiveTest(property$1, "range")), toConsumableArray(createCaseInsensitiveTest(property$1, "range-thumb")), toConsumableArray(createCaseInsensitiveTest(property$1, "resizer")), toConsumableArray(createCaseInsensitiveTest(property$1, "resizerpanel")), toConsumableArray(createCaseInsensitiveTest(property$1, "scale-horizontal")), toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbend")), toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumb-horizontal")), toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbstart")), toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbtick")), toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumb-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "scale-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-down")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-left")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-right")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-up")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarthumb-horizontal")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarthumb-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbartrack-horizontal")), toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbartrack-vertical")), toConsumableArray(createCaseInsensitiveTest(property$1, "searchfield")), toConsumableArray(createCaseInsensitiveTest(property$1, "separator")), toConsumableArray(createCaseInsensitiveTest(property$1, "sheet")), toConsumableArray(createCaseInsensitiveTest(property$1, "spinner")), toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-downbutton")), toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-textfield")), toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-upbutton")), toConsumableArray(createCaseInsensitiveTest(property$1, "splitter")), toConsumableArray(createCaseInsensitiveTest(property$1, "statusbar")), toConsumableArray(createCaseInsensitiveTest(property$1, "statusbarpanel")), toConsumableArray(createCaseInsensitiveTest(property$1, "tab")), toConsumableArray(createCaseInsensitiveTest(property$1, "tabpanel")), toConsumableArray(createCaseInsensitiveTest(property$1, "tabpanels")), toConsumableArray(createCaseInsensitiveTest(property$1, "tab-scroll-arrow-back")), toConsumableArray(createCaseInsensitiveTest(property$1, "tab-scroll-arrow-forward")), toConsumableArray(createCaseInsensitiveTest(property$1, "textfield")), toConsumableArray(createCaseInsensitiveTest(property$1, "textfield-multiline")), toConsumableArray(createCaseInsensitiveTest(property$1, "toolbar")), toConsumableArray(createCaseInsensitiveTest(property$1, "toolbarbutton")), toConsumableArray(createCaseInsensitiveTest(property$1, "toolbarbutton-dropdown")), toConsumableArray(createCaseInsensitiveTest(property$1, "toolbargripper")), toConsumableArray(createCaseInsensitiveTest(property$1, "toolbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "tooltip")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeheader")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeheadercell")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeheadersortarrow")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeitem")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeline")), toConsumableArray(createCaseInsensitiveTest(property$1, "treetwisty")), toConsumableArray(createCaseInsensitiveTest(property$1, "treetwistyopen")), toConsumableArray(createCaseInsensitiveTest(property$1, "treeview")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-mac-unified-toolbar")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-borderless-glass")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-browsertabbar-toolbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-communicationstext")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-communications-toolbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-exclude-glass")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-glass")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-mediatext")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-media-toolbox")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-box")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-box-maximized")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-close")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-maximize")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-minimize")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-restore")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-bottom")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-left")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-right")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-titlebar")), toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-titlebar-maximized")));

var property$2 = "-moz-float-edge";
var mozFloatEdge = [].concat(toConsumableArray(globalTests(property$2)), toConsumableArray(createCaseInsensitiveTest(property$2, "border-box")), toConsumableArray(createCaseInsensitiveTest(property$2, "content-box")), toConsumableArray(createCaseInsensitiveTest(property$2, "margin-box")), toConsumableArray(createCaseInsensitiveTest(property$2, "padding-box")));

var mozForceBrokenImageIcon = ["-moz-force-broken-image-icon", "box-flex-group", "box-ordinal-group", "order", "orphans", "widows"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "10",
    valid: true
  }, {
    property: property,
    value: "+10",
    valid: true
  }, {
    property: property,
    value: "-10",
    valid: true
  }, {
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "+0",
    valid: true
  }, {
    property: property,
    value: "-0",
    valid: true
  }, {
    property: property,
    value: "12.0",
    valid: false
  }, {
    property: property,
    value: "+---12",
    valid: false
  }, {
    property: property,
    value: "3e4",
    valid: false
  }, {
    property: property,
    value: "\\4E94",
    valid: false
  }, {
    property: property,
    value: "_5",
    valid: false
  }]));
  return suite;
}, []);

var property$3 = "-moz-orient";
var mozOrient = [].concat(toConsumableArray(globalTests(property$3)), toConsumableArray(createCaseInsensitiveTest(property$3, "inline")), toConsumableArray(createCaseInsensitiveTest(property$3, "block")), toConsumableArray(createCaseInsensitiveTest(property$3, "horizontal")), toConsumableArray(createCaseInsensitiveTest(property$3, "vertical")));

var property$4 = "-moz-stack-sizing";
var mozStackSizing = [].concat(toConsumableArray(globalTests(property$4)), toConsumableArray(createCaseInsensitiveTest(property$4, "ignore")), toConsumableArray(createCaseInsensitiveTest(property$4, "stretch-to-fit")));

var property$5 = "-moz-text-blink";
var mozTextBlink = [].concat(toConsumableArray(globalTests(property$5)), toConsumableArray(createCaseInsensitiveTest(property$5, "none")), toConsumableArray(createCaseInsensitiveTest(property$5, "blink")));

var property$6 = "-moz-user-focus";
var mozUserFocus = [].concat(toConsumableArray(globalTests(property$6)), toConsumableArray(createCaseInsensitiveTest(property$6, "ignore")), toConsumableArray(createCaseInsensitiveTest(property$6, "normal")), toConsumableArray(createCaseInsensitiveTest(property$6, "select-after")), toConsumableArray(createCaseInsensitiveTest(property$6, "select-before")), toConsumableArray(createCaseInsensitiveTest(property$6, "select-menu")), toConsumableArray(createCaseInsensitiveTest(property$6, "select-same")), toConsumableArray(createCaseInsensitiveTest(property$6, "select-all")), toConsumableArray(createCaseInsensitiveTest(property$6, "none")));

var property$7 = "-moz-user-input";
var mozUserInput = [].concat(toConsumableArray(globalTests(property$7)), toConsumableArray(createCaseInsensitiveTest(property$7, "none")), toConsumableArray(createCaseInsensitiveTest(property$7, "enabled")), toConsumableArray(createCaseInsensitiveTest(property$7, "disabled")));

var property$8 = "-moz-user-modify";
var mozUserModify = [].concat(toConsumableArray(globalTests(property$8)), toConsumableArray(createCaseInsensitiveTest(property$8, "read-only")), toConsumableArray(createCaseInsensitiveTest(property$8, "read-write")), toConsumableArray(createCaseInsensitiveTest(property$8, "write-only")));

var property$9 = "-moz-window-shadow";
var mozWindowShadow = [].concat(toConsumableArray(globalTests(property$9)), toConsumableArray(createCaseInsensitiveTest(property$9, "default")), toConsumableArray(createCaseInsensitiveTest(property$9, "menu")), toConsumableArray(createCaseInsensitiveTest(property$9, "tooltip")), toConsumableArray(createCaseInsensitiveTest(property$9, "sheet")), toConsumableArray(createCaseInsensitiveTest(property$9, "none")));

var webkitBorderBeforeColor = ["-webkit-border-before-color", "-webkit-text-fill-color", "-webkit-text-stroke-color", "background-color", "border-block-end-color", "border-block-start-color", "border-bottom-color", "border-inline-end-color", "border-inline-start-color", "border-left-color", "border-right-color", "border-top-color", "color", "column-rule-color", "text-decoration-color", "text-emphasis-color"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "RGB(1, 2, 3)",
    valid: true
  }, {
    property: property,
    value: "rgb(10%, 20%, 30%)",
    valid: true
  }, {
    property: property,
    value: "rgb(400, 400, 400)",
    valid: true
  }, {
    property: property,
    value: "rgbA(1, 2, 3, .5)",
    valid: true
  }, {
    property: property,
    value: "rgba(10%, 20%, 30%, 0.5)",
    valid: true
  }, {
    property: property,
    value: "rgba(400, 400, 400, 1)",
    valid: true
  }, {
    property: property,
    value: "hsl(90, 50%, 50%)",
    valid: true
  }, {
    property: property,
    value: "HSL(90, 50%, 50%)",
    valid: true
  }, {
    property: property,
    value: "hsla(90, 50%, 50%, .5)",
    valid: true
  }, {
    property: property,
    value: "hsla(90, 50%, 50%, 0.5)",
    valid: true
  }, {
    property: property,
    value: "hslA(90, 50%, 50%, 0)",
    valid: true
  }, {
    property: property,
    value: "#000",
    valid: true
  }, {
    property: property,
    value: "#000F",
    valid: true
  }, {
    property: property,
    value: "#000000",
    valid: true
  }, {
    property: property,
    value: "#000000FF",
    valid: true
  }, {
    property: property,
    value: "RED",
    valid: true
  }, {
    property: property,
    value: "black",
    valid: true
  }, {
    property: property,
    value: "currentcolor",
    valid: true
  }, {
    property: property,
    value: "CURRENTCOLOR",
    valid: true
  }, {
    property: property,
    value: "rgb(1, 2, 3, 4, 5)",
    valid: false
  }, {
    property: property,
    value: "rgb(1:2:3)",
    valid: false
  }, {
    property: property,
    value: "rgb(a, b, c)",
    valid: false
  }, {
    property: property,
    value: "rgba(10%, 20%, 30%, transparent)",
    valid: false
  }, {
    property: property,
    value: "rgba(400: 400)",
    valid: false
  }, {
    property: property,
    value: "rgba(400, 400, 400, 50%)",
    valid: false
  }, {
    property: property,
    value: "hsl(50%, 50%, 50%)",
    valid: false
  }, {
    property: property,
    value: "hsl(90, 50, 50)",
    valid: false
  }, {
    property: property,
    value: "hsla(90, 50%, 50%)",
    valid: false
  }, {
    property: property,
    value: "hsla(90, 50%, 50%, 50%)",
    valid: false
  }, {
    property: property,
    value: "hsla(90%, 50%, 50%, 0.5)",
    valid: false
  }, {
    property: property,
    value: "#ee",
    valid: false
  }, {
    property: property,
    value: "#eeeeeee",
    valid: false
  }, {
    property: property,
    value: "#ggg",
    valid: false
  }, {
    property: property,
    value: "blacklight",
    valid: false
  }]));
  return suite;
}, []);

var webkitBorderBeforeStyle = ["-webkit-border-before-style", "border-block-end-style", "border-block-start-style", "border-inline-end-style", "border-inline-start-style", "border-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "none",
    valid: true
  }, {
    property: property,
    value: "hidden",
    valid: true
  }, {
    property: property,
    value: "dotted",
    valid: true
  }, {
    property: property,
    value: "dashed",
    valid: true
  }, {
    property: property,
    value: "solid",
    valid: true
  }, {
    property: property,
    value: "double",
    valid: true
  }, {
    property: property,
    value: "groove",
    valid: true
  }, {
    property: property,
    value: "ridge",
    valid: true
  }, {
    property: property,
    value: "inset",
    valid: true
  }, {
    property: property,
    value: "outset",
    valid: true
  }, {
    property: property,
    value: "NONE",
    valid: true
  }, {
    property: property,
    value: "HIDDEN",
    valid: true
  }, {
    property: property,
    value: "DOTTED",
    valid: true
  }, {
    property: property,
    value: "DASHED",
    valid: true
  }, {
    property: property,
    value: "SOLID",
    valid: true
  }, {
    property: property,
    value: "DOUBLE",
    valid: true
  }, {
    property: property,
    value: "GROOVE",
    valid: true
  }, {
    property: property,
    value: "RIDGE",
    valid: true
  }, {
    property: property,
    value: "INSET",
    valid: true
  }, {
    property: property,
    value: "OUTSET",
    valid: true
  }, {
    property: property,
    value: "groovy",
    valid: false
  }]));
  return suite;
}, []);

var webkitBorderBeforeWidth = ["-webkit-border-before-width", "border-block-end-width", "border-block-start-width", "border-inline-end-width", "border-inline-start-width", "border-width"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "thin",
    valid: true
  }, {
    property: property,
    value: "medium",
    valid: true
  }, {
    property: property,
    value: "thick",
    valid: true
  }, {
    property: property,
    value: "THIN",
    valid: true
  }, {
    property: property,
    value: "MEDIUM",
    valid: true
  }, {
    property: property,
    value: "THICK",
    valid: true
  }, {
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "huuuuge",
    valid: false
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }]));
  return suite;
}, []);

var webkitMaskRepeat = ["-webkit-mask-repeat", "background-repeat", "mask-repeat"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "repeat-x",
    valid: true
  }, {
    property: property,
    value: "repeat-y",
    valid: true
  }, {
    property: property,
    value: "space round",
    valid: true
  }, {
    property: property,
    value: "no-repeat, no-repeat",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "REPEAT-X",
    valid: true
  }, {
    property: property,
    value: "REPEAT-Y",
    valid: true
  }, {
    property: property,
    value: "SPACE ROUND",
    valid: true
  }, {
    property: property,
    value: "NO-REPEAT, NO-REPEAT",
    valid: true
  }, {
    property: property,
    value: "VAR(--FOO) VAR(--BAR)",
    valid: true
  }, {
    property: property,
    value: "space repeat-x",
    valid: false
  }, {
    property: property,
    value: "repeat-y round",
    valid: false
  }, {
    property: property,
    value: "space round repeat",
    valid: false
  }, {
    property: property,
    value: "repeat-xy",
    valid: false
  }, {
    property: property,
    value: "space / repeat",
    valid: false
  }, {
    property: property,
    value: "space,",
    valid: false
  }, {
    property: property,
    value: "repeat-x, repeat-x",
    valid: true
  }, {
    property: property,
    value: "repeat-x, repeat-x,",
    valid: false
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar),",
    valid: false
  }]));
  return suite;
}, []);

var webkitMaskRepeatX = ["-webkit-mask-repeat-x", "-webkit-mask-repeat-y"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "repeat")), toConsumableArray(createCaseInsensitiveTest(property, "no-repeat")), toConsumableArray(createCaseInsensitiveTest(property, "space")), toConsumableArray(createCaseInsensitiveTest(property, "round"))));
  return suite;
}, []);

var property$10 = "-webkit-tap-highlight-color";
var webkitTapHighlightColor = [].concat(toConsumableArray(globalTests(property$10)), [{
  property: property$10,
  value: "RGB(1, 2, 3)",
  valid: true
}, {
  property: property$10,
  value: "rgb(10%, 20%, 30%)",
  valid: true
}, {
  property: property$10,
  value: "rgb(400, 400, 400)",
  valid: true
}, {
  property: property$10,
  value: "rgbA(1, 2, 3, .5)",
  valid: true
}, {
  property: property$10,
  value: "rgba(10%, 20%, 30%, 0.5)",
  valid: true
}, {
  property: property$10,
  value: "rgba(400, 400, 400, 1)",
  valid: true
}, {
  property: property$10,
  value: "hsl(90, 50%, 50%)",
  valid: true
}, {
  property: property$10,
  value: "HSL(90, 50%, 50%)",
  valid: true
}, {
  property: property$10,
  value: "hsla(90, 50%, 50%, .5)",
  valid: true
}, {
  property: property$10,
  value: "hsla(90, 50%, 50%, 0.5)",
  valid: true
}, {
  property: property$10,
  value: "hslA(90, 50%, 50%, 0)",
  valid: true
}, {
  property: property$10,
  value: "#000",
  valid: true
}, {
  property: property$10,
  value: "#000F",
  valid: true
}, {
  property: property$10,
  value: "#000000",
  valid: true
}, {
  property: property$10,
  value: "#000000FF",
  valid: true
}, {
  property: property$10,
  value: "RED",
  valid: true
}, {
  property: property$10,
  value: "black",
  valid: true
}, {
  property: property$10,
  value: "currentcolor",
  valid: true
}, {
  property: property$10,
  value: "CURRENTCOLOR",
  valid: true
}, {
  property: property$10,
  value: "rgb(1, 2, 3, 4, 5)",
  valid: false
}, {
  property: property$10,
  value: "rgb(1:2:3)",
  valid: false
}, {
  property: property$10,
  value: "rgb(a, b, c)",
  valid: false
}, {
  property: property$10,
  value: "rgba(10%, 20%, 30%, transparent)",
  valid: false
}, {
  property: property$10,
  value: "rgba(400: 400)",
  valid: false
}, {
  property: property$10,
  value: "rgba(400, 400, 400, 50%)",
  valid: false
}, {
  property: property$10,
  value: "hsl(50%, 50%, 50%)",
  valid: false
}, {
  property: property$10,
  value: "hsl(90, 50, 50)",
  valid: false
}, {
  property: property$10,
  value: "hsla(90, 50%, 50%)",
  valid: false
}, {
  property: property$10,
  value: "hsla(90, 50%, 50%, 50%)",
  valid: false
}, {
  property: property$10,
  value: "hsla(90%, 50%, 50%, 0.5)",
  valid: false
}, {
  property: property$10,
  value: "#ee",
  valid: false
}, {
  property: property$10,
  value: "#eeeeeee",
  valid: false
}, {
  property: property$10,
  value: "#ggg",
  valid: false
}, {
  property: property$10,
  value: "blacklight",
  valid: false
}, {
  property: property$10,
  value: "RGB(1, 2, 3), RGB(1, 2, 3)",
  valid: true
}, {
  property: property$10,
  value: "RGB(1, 2, 3), RGB(1, 2, 3),",
  valid: false
}, {
  property: property$10,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$10,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var webkitTextStrokeWidth = ["-webkit-text-stroke-width", "outline-offset"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }]));
  return suite;
}, []);

var property$11 = "-webkit-touch-callout";
var webkitTouchCallout = [].concat(toConsumableArray(globalTests(property$11)), toConsumableArray(createCaseInsensitiveTest(property$11, "default")), toConsumableArray(createCaseInsensitiveTest(property$11, "none")));

var alignContent = ["-webkit-align-content", "align-content"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "space-between")), toConsumableArray(createCaseInsensitiveTest(property, "space-around")), toConsumableArray(createCaseInsensitiveTest(property, "stretch"))));
  return suite;
}, []);

var property$12 = "-ms-flex-line-pack";
var msFlexLinePack = [].concat(toConsumableArray(globalTests(property$12)), toConsumableArray(createCaseInsensitiveTest(property$12, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property$12, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property$12, "center")), toConsumableArray(createCaseInsensitiveTest(property$12, "space-between")), toConsumableArray(createCaseInsensitiveTest(property$12, "space-around")), toConsumableArray(createCaseInsensitiveTest(property$12, "stretch")), toConsumableArray(createCaseInsensitiveTest(property$12, "start")), toConsumableArray(createCaseInsensitiveTest(property$12, "end")), toConsumableArray(createCaseInsensitiveTest(property$12, "justify")), toConsumableArray(createCaseInsensitiveTest(property$12, "distribute")));

var msFlexAlign = ["-webkit-box-align", "-moz-box-align", "-ms-flex-align"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "baseline")), toConsumableArray(createCaseInsensitiveTest(property, "stretch")), toConsumableArray(createCaseInsensitiveTest(property, "start")), toConsumableArray(createCaseInsensitiveTest(property, "end"))));
  return suite;
}, []);

var alignItems = ["-webkit-align-items", "-ms-grid-row-align", "align-items"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "baseline")), toConsumableArray(createCaseInsensitiveTest(property, "stretch"))));
  return suite;
}, []);

var alignSelf = ["-webkit-align-self", "align-self"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "baseline")), toConsumableArray(createCaseInsensitiveTest(property, "stretch"))));
  return suite;
}, []);

var property$13 = "-ms-flex-item-align";
var msFlexItemAlign = [].concat(toConsumableArray(globalTests(property$13)), toConsumableArray(createCaseInsensitiveTest(property$13, "auto")), toConsumableArray(createCaseInsensitiveTest(property$13, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property$13, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property$13, "center")), toConsumableArray(createCaseInsensitiveTest(property$13, "baseline")), toConsumableArray(createCaseInsensitiveTest(property$13, "stretch")), toConsumableArray(createCaseInsensitiveTest(property$13, "start")), toConsumableArray(createCaseInsensitiveTest(property$13, "end")));

var property$14 = "all";
var all = [].concat(toConsumableArray(globalTests(property$14)));

var animationDelay = ["animation-delay", "animation-duration", "transition-delay", "transition-duration"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "2s",
    valid: true
  }, {
    property: property,
    value: "1500ms",
    valid: true
  }, {
    property: property,
    value: "0.75s",
    valid: true
  }, {
    property: property,
    value: "2 seconds",
    valid: false
  }, {
    property: property,
    value: "1000μs",
    valid: false
  }, {
    property: property,
    value: "10.s",
    valid: false
  }, {
    property: property,
    value: "2s, 2s",
    valid: true
  }, {
    property: property,
    value: "2s, 2s,",
    valid: false
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar),",
    valid: false
  }]));
  return suite;
}, []);

var property$15 = "animation-direction";
var animationDirection = [].concat(toConsumableArray(globalTests(property$15)), [{
  property: property$15,
  value: "normal",
  valid: true
}, {
  property: property$15,
  value: "reverse",
  valid: true
}, {
  property: property$15,
  value: "alternate",
  valid: true
}, {
  property: property$15,
  value: "alternate-reverse",
  valid: true
}, {
  property: property$15,
  value: "NORMAL",
  valid: true
}, {
  property: property$15,
  value: "REVERSE",
  valid: true
}, {
  property: property$15,
  value: "ALTERNATE",
  valid: true
}, {
  property: property$15,
  value: "ALTERNATE-REVERSE",
  valid: true
}, {
  property: property$15,
  value: "alternate-normal-reverse",
  valid: false
}, {
  property: property$15,
  value: "normal, normal",
  valid: true
}, {
  property: property$15,
  value: "normal, normal,",
  valid: false
}, {
  property: property$15,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$15,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$16 = "animation-fill-mode";
var animationFillMode = [].concat(toConsumableArray(globalTests(property$16)), [{
  property: property$16,
  value: "none",
  valid: true
}, {
  property: property$16,
  value: "forwards",
  valid: true
}, {
  property: property$16,
  value: "backwards",
  valid: true
}, {
  property: property$16,
  value: "both",
  valid: true
}, {
  property: property$16,
  value: "NONE",
  valid: true
}, {
  property: property$16,
  value: "FORWARDS",
  valid: true
}, {
  property: property$16,
  value: "BACKWARDS",
  valid: true
}, {
  property: property$16,
  value: "BOTH",
  valid: true
}, {
  property: property$16,
  value: "forwards-backwards",
  valid: false
}, {
  property: property$16,
  value: "none, none",
  valid: true
}, {
  property: property$16,
  value: "none, none,",
  valid: false
}, {
  property: property$16,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$16,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$17 = "animation-name";
var animationName = [].concat(toConsumableArray(globalTests(property$17)), [{
  property: property$17,
  value: "Bond-007",
  valid: true
}, {
  property: property$17,
  value: "alpha",
  valid: true
}, {
  property: property$17,
  value: "_-_",
  valid: true
}, {
  property: property$17,
  value: "\\1F638",
  valid: true
}, {
  property: property$17,
  value: "-B",
  valid: true
}, {
  property: property$17,
  value: "none",
  valid: true
}, {
  property: property$17,
  value: "NONE",
  valid: true
}, {
  property: property$17,
  value: "007-Bond",
  valid: false
}, {
  property: property$17,
  value: "0B",
  valid: false
}, {
  property: property$17,
  value: "--B",
  valid: false
}, {
  property: property$17,
  value: "-0",
  valid: false
}, {
  property: property$17,
  value: "Bond-007, Bond-007",
  valid: true
}, {
  property: property$17,
  value: "Bond-007, Bond-007,",
  valid: false
}, {
  property: property$17,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$17,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$18 = "animation-play-state";
var animationPlayState = [].concat(toConsumableArray(globalTests(property$18)), [{
  property: property$18,
  value: "running",
  valid: true
}, {
  property: property$18,
  value: "paused",
  valid: true
}, {
  property: property$18,
  value: "RUNNING",
  valid: true
}, {
  property: property$18,
  value: "PAUSED",
  valid: true
}, {
  property: property$18,
  value: "running-paused",
  valid: false
}, {
  property: property$18,
  value: "running, running",
  valid: true
}, {
  property: property$18,
  value: "running, running,",
  valid: false
}, {
  property: property$18,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$18,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var animationTimingFunction = ["animation-timing-function", "transition-timing-function"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "ease",
    valid: true
  }, {
    property: property,
    value: "linear",
    valid: true
  }, {
    property: property,
    value: "ease-in",
    valid: true
  }, {
    property: property,
    value: "ease-out",
    valid: true
  }, {
    property: property,
    value: "ease-in-out",
    valid: true
  }, {
    property: property,
    value: "step-start",
    valid: true
  }, {
    property: property,
    value: "step-end",
    valid: true
  }, {
    property: property,
    value: "EASE",
    valid: true
  }, {
    property: property,
    value: "LINEAR",
    valid: true
  }, {
    property: property,
    value: "EASE-IN",
    valid: true
  }, {
    property: property,
    value: "EASE-OUT",
    valid: true
  }, {
    property: property,
    value: "EASE-IN-OUT",
    valid: true
  }, {
    property: property,
    value: "STEP-START",
    valid: true
  }, {
    property: property,
    value: "STEP-END",
    valid: true
  }, {
    property: property,
    value: "STEPS(1)",
    valid: true
  }, {
    property: property,
    value: "steps(5, start)",
    valid: true
  }, {
    property: property,
    value: "steps(5, end)",
    valid: true
  }, {
    property: property,
    value: "steps(5, START)",
    valid: true
  }, {
    property: property,
    value: "steps(5, END)",
    valid: true
  }, {
    property: property,
    value: "cubic-bezier(0.1, 0.7, 1.0, 0.1)",
    valid: true
  }, {
    property: property,
    value: "CUBIC-BEZIER(0.1, 0.7, 1.0, 0.1)",
    valid: true
  }, {
    property: property,
    value: "ease-in-out-in-ease",
    valid: false
  }, {
    property: property,
    value: "steps(1.0)",
    valid: false
  }, {
    property: property,
    value: "steps(2.5, start)",
    valid: false
  }, {
    property: property,
    value: "steps(2/start)",
    valid: false
  }, {
    property: property,
    value: "steps(5, middle)",
    valid: false
  }, {
    property: property,
    value: "cubic-bezier(0.1, red, 1.0, green)",
    valid: false
  }, {
    property: property,
    value: "cubic-bezier(2.45, 0.6, 4, 0.1)",
    valid: false
  }, {
    property: property,
    value: "cubic-bezier(0.3, 2.1)",
    valid: false
  }, {
    property: property,
    value: "cubic-bezier(-1.9, 0.3, -0.2, 2.1)",
    valid: false
  }, {
    property: property,
    value: "ease, ease",
    valid: true
  }, {
    property: property,
    value: "ease, ease,",
    valid: false
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar),",
    valid: false
  }]));
  return suite;
}, []);

var appearance = ["-webkit-appearance", "-moz-appearance", "appearance"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "none"))));
  return suite;
}, []);

var backfaceVisibility = ["-webkit-backface-visibility", "-moz-backface-visibility", "backface-visibility"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "visible")), toConsumableArray(createCaseInsensitiveTest(property, "hidden"))));
  return suite;
}, []);

var property$19 = "background-attachment";
var backgroundAttachment = [].concat(toConsumableArray(globalTests(property$19)), [{
  property: property$19,
  value: "scroll",
  valid: true
}, {
  property: property$19,
  value: "fixed",
  valid: true
}, {
  property: property$19,
  value: "local",
  valid: true
}, {
  property: property$19,
  value: "SCROLL",
  valid: true
}, {
  property: property$19,
  value: "FIXED",
  valid: true
}, {
  property: property$19,
  value: "LOCAL",
  valid: true
}, {
  property: property$19,
  value: "local-scroll",
  valid: false
}, {
  property: property$19,
  value: "scroll, scroll",
  valid: true
}, {
  property: property$19,
  value: "scroll, scroll,",
  valid: false
}, {
  property: property$19,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$19,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$20 = "background-blend-mode";
var backgroundBlendMode = [].concat(toConsumableArray(globalTests(property$20)), [{
  property: property$20,
  value: "normal",
  valid: true
}, {
  property: property$20,
  value: "multiply",
  valid: true
}, {
  property: property$20,
  value: "screen",
  valid: true
}, {
  property: property$20,
  value: "overlay",
  valid: true
}, {
  property: property$20,
  value: "darken",
  valid: true
}, {
  property: property$20,
  value: "lighten",
  valid: true
}, {
  property: property$20,
  value: "color-dodge",
  valid: true
}, {
  property: property$20,
  value: "color-burn",
  valid: true
}, {
  property: property$20,
  value: "hard-light",
  valid: true
}, {
  property: property$20,
  value: "soft-light",
  valid: true
}, {
  property: property$20,
  value: "difference",
  valid: true
}, {
  property: property$20,
  value: "exclusion",
  valid: true
}, {
  property: property$20,
  value: "hue",
  valid: true
}, {
  property: property$20,
  value: "saturation",
  valid: true
}, {
  property: property$20,
  value: "color",
  valid: true
}, {
  property: property$20,
  value: "luminosity",
  valid: true
}, {
  property: property$20,
  value: "NORMAL",
  valid: true
}, {
  property: property$20,
  value: "MULTIPLY",
  valid: true
}, {
  property: property$20,
  value: "SCREEN",
  valid: true
}, {
  property: property$20,
  value: "OVERLAY",
  valid: true
}, {
  property: property$20,
  value: "DARKEN",
  valid: true
}, {
  property: property$20,
  value: "LIGHTEN",
  valid: true
}, {
  property: property$20,
  value: "COLOR-DODGE",
  valid: true
}, {
  property: property$20,
  value: "COLOR-BURN",
  valid: true
}, {
  property: property$20,
  value: "HARD-LIGHT",
  valid: true
}, {
  property: property$20,
  value: "SOFT-LIGHT",
  valid: true
}, {
  property: property$20,
  value: "DIFFERENCE",
  valid: true
}, {
  property: property$20,
  value: "EXCLUSION",
  valid: true
}, {
  property: property$20,
  value: "HUE",
  valid: true
}, {
  property: property$20,
  value: "SATURATION",
  valid: true
}, {
  property: property$20,
  value: "COLOR",
  valid: true
}, {
  property: property$20,
  value: "LUMINOSITY",
  valid: true
}, {
  property: property$20,
  value: "superblend",
  valid: false
}, {
  property: property$20,
  value: "blend-man",
  valid: false
}, {
  property: property$20,
  value: "normal, normal",
  valid: true
}, {
  property: property$20,
  value: "normal, normal,",
  valid: false
}, {
  property: property$20,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$20,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var backgroundClip = ["background-clip", "background-origin"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "border-box",
    valid: true
  }, {
    property: property,
    value: "padding-box",
    valid: true
  }, {
    property: property,
    value: "content-box",
    valid: true
  }, {
    property: property,
    value: "BORDER-BOX",
    valid: true
  }, {
    property: property,
    value: "PADDING-BOX",
    valid: true
  }, {
    property: property,
    value: "CONTENT-BOX",
    valid: true
  }, {
    property: property,
    value: "rock-box",
    valid: false
  }, {
    property: property,
    value: "border-box, border-box",
    valid: true
  }, {
    property: property,
    value: "border-box, border-box,",
    valid: false
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar),",
    valid: false
  }]));
  return suite;
}, []);

var borderBottomLeftRadius = ["border-bottom-left-radius", "border-bottom-right-radius", "border-top-left-radius", "border-top-right-radius"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }]));
  return suite;
}, []);

var borderBottomStyle = ["border-bottom-style", "border-left-style", "border-right-style", "border-top-style", "column-rule-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "none",
    valid: true
  }, {
    property: property,
    value: "hidden",
    valid: true
  }, {
    property: property,
    value: "dotted",
    valid: true
  }, {
    property: property,
    value: "dashed",
    valid: true
  }, {
    property: property,
    value: "solid",
    valid: true
  }, {
    property: property,
    value: "double",
    valid: true
  }, {
    property: property,
    value: "groove",
    valid: true
  }, {
    property: property,
    value: "ridge",
    valid: true
  }, {
    property: property,
    value: "inset",
    valid: true
  }, {
    property: property,
    value: "outset",
    valid: true
  }, {
    property: property,
    value: "NONE",
    valid: true
  }, {
    property: property,
    value: "HIDDEN",
    valid: true
  }, {
    property: property,
    value: "DOTTED",
    valid: true
  }, {
    property: property,
    value: "DASHED",
    valid: true
  }, {
    property: property,
    value: "SOLID",
    valid: true
  }, {
    property: property,
    value: "DOUBLE",
    valid: true
  }, {
    property: property,
    value: "GROOVE",
    valid: true
  }, {
    property: property,
    value: "RIDGE",
    valid: true
  }, {
    property: property,
    value: "INSET",
    valid: true
  }, {
    property: property,
    value: "OUTSET",
    valid: true
  }, {
    property: property,
    value: "groovy",
    valid: false
  }]));
  return suite;
}, []);

var borderBottomWidth = ["border-bottom-width", "border-left-width", "border-right-width", "border-top-width", "column-rule-width", "outline-width"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "thin",
    valid: true
  }, {
    property: property,
    value: "medium",
    valid: true
  }, {
    property: property,
    value: "thick",
    valid: true
  }, {
    property: property,
    value: "THIN",
    valid: true
  }, {
    property: property,
    value: "MEDIUM",
    valid: true
  }, {
    property: property,
    value: "THICK",
    valid: true
  }, {
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "huuuuge",
    valid: false
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }]));
  return suite;
}, []);

var property$21 = "border-collapse";
var borderCollapse = [].concat(toConsumableArray(globalTests(property$21)), toConsumableArray(createCaseInsensitiveTest(property$21, "collapse")), toConsumableArray(createCaseInsensitiveTest(property$21, "separate")));

var property$22 = "border-color";
var borderColor = [].concat(toConsumableArray(globalTests(property$22)), [{
  property: property$22,
  value: "RGB(1, 2, 3)",
  valid: true
}, {
  property: property$22,
  value: "rgb(10%, 20%, 30%)",
  valid: true
}, {
  property: property$22,
  value: "rgb(400, 400, 400)",
  valid: true
}, {
  property: property$22,
  value: "rgbA(1, 2, 3, .5)",
  valid: true
}, {
  property: property$22,
  value: "rgba(10%, 20%, 30%, 0.5)",
  valid: true
}, {
  property: property$22,
  value: "rgba(400, 400, 400, 1)",
  valid: true
}, {
  property: property$22,
  value: "hsl(90, 50%, 50%)",
  valid: true
}, {
  property: property$22,
  value: "HSL(90, 50%, 50%)",
  valid: true
}, {
  property: property$22,
  value: "hsla(90, 50%, 50%, .5)",
  valid: true
}, {
  property: property$22,
  value: "hsla(90, 50%, 50%, 0.5)",
  valid: true
}, {
  property: property$22,
  value: "hslA(90, 50%, 50%, 0)",
  valid: true
}, {
  property: property$22,
  value: "#000",
  valid: true
}, {
  property: property$22,
  value: "#000F",
  valid: true
}, {
  property: property$22,
  value: "#000000",
  valid: true
}, {
  property: property$22,
  value: "#000000FF",
  valid: true
}, {
  property: property$22,
  value: "RED",
  valid: true
}, {
  property: property$22,
  value: "black",
  valid: true
}, {
  property: property$22,
  value: "currentcolor",
  valid: true
}, {
  property: property$22,
  value: "CURRENTCOLOR",
  valid: true
}, {
  property: property$22,
  value: "rgb(1, 2, 3, 4, 5)",
  valid: false
}, {
  property: property$22,
  value: "rgb(1:2:3)",
  valid: false
}, {
  property: property$22,
  value: "rgb(a, b, c)",
  valid: false
}, {
  property: property$22,
  value: "rgba(10%, 20%, 30%, transparent)",
  valid: false
}, {
  property: property$22,
  value: "rgba(400: 400)",
  valid: false
}, {
  property: property$22,
  value: "rgba(400, 400, 400, 50%)",
  valid: false
}, {
  property: property$22,
  value: "hsl(50%, 50%, 50%)",
  valid: false
}, {
  property: property$22,
  value: "hsl(90, 50, 50)",
  valid: false
}, {
  property: property$22,
  value: "hsla(90, 50%, 50%)",
  valid: false
}, {
  property: property$22,
  value: "hsla(90, 50%, 50%, 50%)",
  valid: false
}, {
  property: property$22,
  value: "hsla(90%, 50%, 50%, 0.5)",
  valid: false
}, {
  property: property$22,
  value: "#ee",
  valid: false
}, {
  property: property$22,
  value: "#eeeeeee",
  valid: false
}, {
  property: property$22,
  value: "#ggg",
  valid: false
}, {
  property: property$22,
  value: "blacklight",
  valid: false
}]);

var bottom = ["bottom", "left", "-webkit-margin-after", "margin-block-end", "-webkit-margin-before", "margin-block-start", "margin-bottom", "-webkit-margin-end", "-moz-margin-end", "margin-inline-end", "-webkit-margin-start", "-moz-margin-start", "margin-inline-start", "margin-left", "margin-right", "margin-top", "offset-block-end", "offset-block-start", "offset-inline-end", "offset-inline-start", "right", "top"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto"))));
  return suite;
}, []);

var property$23 = "box-align";
var boxAlign = [].concat(toConsumableArray(globalTests(property$23)), toConsumableArray(createCaseInsensitiveTest(property$23, "start")), toConsumableArray(createCaseInsensitiveTest(property$23, "center")), toConsumableArray(createCaseInsensitiveTest(property$23, "end")), toConsumableArray(createCaseInsensitiveTest(property$23, "baseline")), toConsumableArray(createCaseInsensitiveTest(property$23, "stretch")));

var boxDecorationBreak = ["-webkit-box-decoration-break", "box-decoration-break"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "slice")), toConsumableArray(createCaseInsensitiveTest(property, "clone"))));
  return suite;
}, []);

var property$24 = "box-direction";
var boxDirection = [].concat(toConsumableArray(globalTests(property$24)), toConsumableArray(createCaseInsensitiveTest(property$24, "normal")), toConsumableArray(createCaseInsensitiveTest(property$24, "reverse")), toConsumableArray(createCaseInsensitiveTest(property$24, "inherit")));

var boxFlex = ["box-flex", "flex-grow", "flex-shrink", "opacity", "shape-image-threshold"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "12",
    valid: true
  }, {
    property: property,
    value: "4.01",
    valid: true
  }, {
    property: property,
    value: "-456.8",
    valid: true
  }, {
    property: property,
    value: "0.0",
    valid: true
  }, {
    property: property,
    value: "+0.0",
    valid: true
  }, {
    property: property,
    value: "-0.0",
    valid: true
  }, {
    property: property,
    value: ".60",
    valid: true
  }, {
    property: property,
    value: "10e3",
    valid: true
  }, {
    property: property,
    value: "-3.4e-2",
    valid: true
  }, {
    property: property,
    value: "12.",
    valid: false
  }, {
    property: property,
    value: "+-12.2",
    valid: false
  }, {
    property: property,
    value: "12.1.1",
    valid: false
  }]));
  return suite;
}, []);

var property$25 = "box-lines";
var boxLines = [].concat(toConsumableArray(globalTests(property$25)), toConsumableArray(createCaseInsensitiveTest(property$25, "single")), toConsumableArray(createCaseInsensitiveTest(property$25, "multiple")));

var property$26 = "box-orient";
var boxOrient = [].concat(toConsumableArray(globalTests(property$26)), toConsumableArray(createCaseInsensitiveTest(property$26, "horizontal")), toConsumableArray(createCaseInsensitiveTest(property$26, "vertical")), toConsumableArray(createCaseInsensitiveTest(property$26, "inline-axis")), toConsumableArray(createCaseInsensitiveTest(property$26, "block-axis")), toConsumableArray(createCaseInsensitiveTest(property$26, "inherit")));

var property$27 = "box-pack";
var boxPack = [].concat(toConsumableArray(globalTests(property$27)), toConsumableArray(createCaseInsensitiveTest(property$27, "start")), toConsumableArray(createCaseInsensitiveTest(property$27, "center")), toConsumableArray(createCaseInsensitiveTest(property$27, "end")), toConsumableArray(createCaseInsensitiveTest(property$27, "justify")));

var boxSizing = ["-webkit-box-sizing", "-moz-box-sizing", "box-sizing"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "content-box")), toConsumableArray(createCaseInsensitiveTest(property, "border-box"))));
  return suite;
}, []);

var property$28 = "box-suppress";
var boxSuppress = [].concat(toConsumableArray(globalTests(property$28)), toConsumableArray(createCaseInsensitiveTest(property$28, "show")), toConsumableArray(createCaseInsensitiveTest(property$28, "discard")), toConsumableArray(createCaseInsensitiveTest(property$28, "hide")));

var pageBreakAfter = ["page-break-after", "page-break-before"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "always")), toConsumableArray(createCaseInsensitiveTest(property, "avoid")), toConsumableArray(createCaseInsensitiveTest(property, "left")), toConsumableArray(createCaseInsensitiveTest(property, "right"))));
  return suite;
}, []);

var webkitColumnBreakInside = ["-webkit-column-break-inside", "page-break-inside", "break-inside"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "avoid")), toConsumableArray(createCaseInsensitiveTest(property, "avoid-page")), toConsumableArray(createCaseInsensitiveTest(property, "avoid-column")), toConsumableArray(createCaseInsensitiveTest(property, "avoid-region"))));
  return suite;
}, []);

var property$29 = "caption-side";
var captionSide = [].concat(toConsumableArray(globalTests(property$29)), toConsumableArray(createCaseInsensitiveTest(property$29, "top")), toConsumableArray(createCaseInsensitiveTest(property$29, "bottom")), toConsumableArray(createCaseInsensitiveTest(property$29, "block-start")), toConsumableArray(createCaseInsensitiveTest(property$29, "block-end")), toConsumableArray(createCaseInsensitiveTest(property$29, "inline-start")), toConsumableArray(createCaseInsensitiveTest(property$29, "inline-end")));

var property$30 = "clear";
var clear = [].concat(toConsumableArray(globalTests(property$30)), toConsumableArray(createCaseInsensitiveTest(property$30, "none")), toConsumableArray(createCaseInsensitiveTest(property$30, "left")), toConsumableArray(createCaseInsensitiveTest(property$30, "right")), toConsumableArray(createCaseInsensitiveTest(property$30, "both")), toConsumableArray(createCaseInsensitiveTest(property$30, "inline-start")), toConsumableArray(createCaseInsensitiveTest(property$30, "inline-end")));

var columnCount = ["-webkit-column-count", "-moz-column-count", "column-count"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "12",
    valid: true
  }, {
    property: property,
    value: "4.01",
    valid: true
  }, {
    property: property,
    value: "-456.8",
    valid: true
  }, {
    property: property,
    value: "0.0",
    valid: true
  }, {
    property: property,
    value: "+0.0",
    valid: true
  }, {
    property: property,
    value: "-0.0",
    valid: true
  }, {
    property: property,
    value: ".60",
    valid: true
  }, {
    property: property,
    value: "10e3",
    valid: true
  }, {
    property: property,
    value: "-3.4e-2",
    valid: true
  }, {
    property: property,
    value: "12.",
    valid: false
  }, {
    property: property,
    value: "+-12.2",
    valid: false
  }, {
    property: property,
    value: "12.1.1",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto"))));
  return suite;
}, []);

var columnFill = ["-webkit-column-fill", "-moz-column-fill", "column-fill"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "balance"))));
  return suite;
}, []);

var columnGap = ["-webkit-column-gap", "-moz-column-gap", "column-gap"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "normal"))));
  return suite;
}, []);

var columnSpan = ["-webkit-column-span", "-moz-column-span", "column-span"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "all"))));
  return suite;
}, []);

var columnWidth = ["-webkit-column-width", "-moz-column-width", "column-width", "marker-offset"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto"))));
  return suite;
}, []);

var property$31 = "direction";
var direction = [].concat(toConsumableArray(globalTests(property$31)), toConsumableArray(createCaseInsensitiveTest(property$31, "ltr")), toConsumableArray(createCaseInsensitiveTest(property$31, "rtl")));

var property$32 = "display";
var display = [].concat(toConsumableArray(globalTests(property$32)), toConsumableArray(createCaseInsensitiveTest(property$32, "none")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline")), toConsumableArray(createCaseInsensitiveTest(property$32, "block")), toConsumableArray(createCaseInsensitiveTest(property$32, "list-item")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline-list-item")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline-block")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline-table")), toConsumableArray(createCaseInsensitiveTest(property$32, "table")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-cell")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-column")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-column-group")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-footer-group")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-header-group")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-row")), toConsumableArray(createCaseInsensitiveTest(property$32, "table-row-group")), toConsumableArray(createCaseInsensitiveTest(property$32, "flex")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline-flex")), toConsumableArray(createCaseInsensitiveTest(property$32, "grid")), toConsumableArray(createCaseInsensitiveTest(property$32, "inline-grid")), toConsumableArray(createCaseInsensitiveTest(property$32, "run-in")), toConsumableArray(createCaseInsensitiveTest(property$32, "ruby")), toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-base")), toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-text")), toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-base-container")), toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-text-container")), toConsumableArray(createCaseInsensitiveTest(property$32, "contents")), toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-box")), toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-flex")), toConsumableArray(createCaseInsensitiveTest(property$32, "-moz-box")), toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-flexbox")), toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-inline-box")), toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-inline-flex")), toConsumableArray(createCaseInsensitiveTest(property$32, "-moz-inline-box")), toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-inline-flexbox")), toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-grid")), toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-inline-grid")));

var property$33 = "display-inside";
var displayInside = [].concat(toConsumableArray(globalTests(property$33)), toConsumableArray(createCaseInsensitiveTest(property$33, "auto")), toConsumableArray(createCaseInsensitiveTest(property$33, "block")), toConsumableArray(createCaseInsensitiveTest(property$33, "table")), toConsumableArray(createCaseInsensitiveTest(property$33, "flex")), toConsumableArray(createCaseInsensitiveTest(property$33, "grid")), toConsumableArray(createCaseInsensitiveTest(property$33, "ruby")));

var property$34 = "display-list";
var displayList = [].concat(toConsumableArray(globalTests(property$34)), toConsumableArray(createCaseInsensitiveTest(property$34, "none")), toConsumableArray(createCaseInsensitiveTest(property$34, "list-item")));

var property$35 = "display-outside";
var displayOutside = [].concat(toConsumableArray(globalTests(property$35)), toConsumableArray(createCaseInsensitiveTest(property$35, "block-level")), toConsumableArray(createCaseInsensitiveTest(property$35, "inline-level")), toConsumableArray(createCaseInsensitiveTest(property$35, "run-in")), toConsumableArray(createCaseInsensitiveTest(property$35, "contents")), toConsumableArray(createCaseInsensitiveTest(property$35, "none")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-row-group")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-header-group")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-footer-group")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-row")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-cell")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-column-group")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-column")), toConsumableArray(createCaseInsensitiveTest(property$35, "table-caption")), toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-base")), toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-text")), toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-base-container")), toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-text-container")));

var property$36 = "empty-cells";
var emptyCells = [].concat(toConsumableArray(globalTests(property$36)), toConsumableArray(createCaseInsensitiveTest(property$36, "show")), toConsumableArray(createCaseInsensitiveTest(property$36, "hide")));

var mozBoxOrient = ["-webkit-box-orient", "-moz-box-orient"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), toConsumableArray(createCaseInsensitiveTest(property, "column")), toConsumableArray(createCaseInsensitiveTest(property, "column-reverse")), toConsumableArray(createCaseInsensitiveTest(property, "horizontal")), toConsumableArray(createCaseInsensitiveTest(property, "vertical"))));
  return suite;
}, []);

var mozBoxDirection = ["-webkit-box-direction", "-moz-box-direction"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), toConsumableArray(createCaseInsensitiveTest(property, "column")), toConsumableArray(createCaseInsensitiveTest(property, "column-reverse")), toConsumableArray(createCaseInsensitiveTest(property, "normal")), toConsumableArray(createCaseInsensitiveTest(property, "reverse"))));
  return suite;
}, []);

var flexDirection = ["-webkit-flex-direction", "-ms-flex-direction", "flex-direction"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), toConsumableArray(createCaseInsensitiveTest(property, "column")), toConsumableArray(createCaseInsensitiveTest(property, "column-reverse"))));
  return suite;
}, []);

var flexWrap = ["-webkit-flex-wrap", "-ms-flex-wrap", "flex-wrap"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "nowrap")), toConsumableArray(createCaseInsensitiveTest(property, "wrap")), toConsumableArray(createCaseInsensitiveTest(property, "wrap-reverse"))));
  return suite;
}, []);

var property$37 = "float";
var float = [].concat(toConsumableArray(globalTests(property$37)), toConsumableArray(createCaseInsensitiveTest(property$37, "left")), toConsumableArray(createCaseInsensitiveTest(property$37, "right")), toConsumableArray(createCaseInsensitiveTest(property$37, "none")), toConsumableArray(createCaseInsensitiveTest(property$37, "inline-start")), toConsumableArray(createCaseInsensitiveTest(property$37, "inline-end")));

var fontKerning = ["-webkit-font-kerning", "-moz-font-kerning", "font-kerning"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "normal")), toConsumableArray(createCaseInsensitiveTest(property, "none"))));
  return suite;
}, []);

var fontLanguageOverride = ["-webkit-font-language-override", "-moz-font-language-override", "font-language-override"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "\"foo\"",
    valid: true
  }, {
    property: property,
    value: "'bar'",
    valid: true
  }, {
    property: property,
    value: "baz",
    valid: false
  }, {
    property: property,
    value: "`quux`",
    valid: false
  }]));
  return suite;
}, []);

var property$38 = "font-size";
var fontSize = [].concat(toConsumableArray(globalTests(property$38)), [{
  property: property$38,
  value: "xx-small",
  valid: true
}, {
  property: property$38,
  value: "x-small",
  valid: true
}, {
  property: property$38,
  value: "small",
  valid: true
}, {
  property: property$38,
  value: "medium",
  valid: true
}, {
  property: property$38,
  value: "large",
  valid: true
}, {
  property: property$38,
  value: "x-large",
  valid: true
}, {
  property: property$38,
  value: "xx-large",
  valid: true
}, {
  property: property$38,
  value: "XX-SMALL",
  valid: true
}, {
  property: property$38,
  value: "X-SMALL",
  valid: true
}, {
  property: property$38,
  value: "SMALL",
  valid: true
}, {
  property: property$38,
  value: "MEDIUM",
  valid: true
}, {
  property: property$38,
  value: "LARGE",
  valid: true
}, {
  property: property$38,
  value: "X-LARGE",
  valid: true
}, {
  property: property$38,
  value: "XX-LARGE",
  valid: true
}, {
  property: property$38,
  value: "reallysmall",
  valid: false
}, {
  property: property$38,
  value: "superduperlarge",
  valid: false
}, {
  property: property$38,
  value: "larger",
  valid: true
}, {
  property: property$38,
  value: "smaller",
  valid: true
}, {
  property: property$38,
  value: "LARGER",
  valid: true
}, {
  property: property$38,
  value: "SMALLER",
  valid: true
}, {
  property: property$38,
  value: "larger-really-larger",
  valid: false
}, {
  property: property$38,
  value: "smaller-still",
  valid: false
}, {
  property: property$38,
  value: "0",
  valid: true
}, {
  property: property$38,
  value: "16px",
  valid: true
}, {
  property: property$38,
  value: "1pc",
  valid: true
}, {
  property: property$38,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$38,
  value: "1%",
  valid: true
}, {
  property: property$38,
  value: "88%",
  valid: true
}, {
  property: property$38,
  value: "99.99%",
  valid: true
}, {
  property: property$38,
  value: "+100%",
  valid: true
}, {
  property: property$38,
  value: "16.px",
  valid: false
}, {
  property: property$38,
  value: "px16",
  valid: false
}, {
  property: property$38,
  value: "one rem",
  valid: false
}, {
  property: property$38,
  value: "12.%",
  valid: false
}, {
  property: property$38,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}]);

var property$39 = "font-size-adjust";
var fontSizeAdjust = [].concat(toConsumableArray(globalTests(property$39)), toConsumableArray(createCaseInsensitiveTest(property$39, "none")), [{
  property: property$39,
  value: "12",
  valid: true
}, {
  property: property$39,
  value: "4.01",
  valid: true
}, {
  property: property$39,
  value: "-456.8",
  valid: true
}, {
  property: property$39,
  value: "0.0",
  valid: true
}, {
  property: property$39,
  value: "+0.0",
  valid: true
}, {
  property: property$39,
  value: "-0.0",
  valid: true
}, {
  property: property$39,
  value: ".60",
  valid: true
}, {
  property: property$39,
  value: "10e3",
  valid: true
}, {
  property: property$39,
  value: "-3.4e-2",
  valid: true
}, {
  property: property$39,
  value: "12.",
  valid: false
}, {
  property: property$39,
  value: "+-12.2",
  valid: false
}, {
  property: property$39,
  value: "12.1.1",
  valid: false
}]);

var property$40 = "font-stretch";
var fontStretch = [].concat(toConsumableArray(globalTests(property$40)), toConsumableArray(createCaseInsensitiveTest(property$40, "normal")), toConsumableArray(createCaseInsensitiveTest(property$40, "ultra-condensed")), toConsumableArray(createCaseInsensitiveTest(property$40, "extra-condensed")), toConsumableArray(createCaseInsensitiveTest(property$40, "condensed")), toConsumableArray(createCaseInsensitiveTest(property$40, "semi-condensed")), toConsumableArray(createCaseInsensitiveTest(property$40, "semi-expanded")), toConsumableArray(createCaseInsensitiveTest(property$40, "expanded")), toConsumableArray(createCaseInsensitiveTest(property$40, "extra-expanded")), toConsumableArray(createCaseInsensitiveTest(property$40, "ultra-expanded")));

var property$41 = "font-style";
var fontStyle = [].concat(toConsumableArray(globalTests(property$41)), toConsumableArray(createCaseInsensitiveTest(property$41, "normal")), toConsumableArray(createCaseInsensitiveTest(property$41, "italic")), toConsumableArray(createCaseInsensitiveTest(property$41, "oblique")));

var property$42 = "font-variant-caps";
var fontVariantCaps = [].concat(toConsumableArray(globalTests(property$42)), toConsumableArray(createCaseInsensitiveTest(property$42, "normal")), toConsumableArray(createCaseInsensitiveTest(property$42, "small-caps")), toConsumableArray(createCaseInsensitiveTest(property$42, "all-small-caps")), toConsumableArray(createCaseInsensitiveTest(property$42, "petite-caps")), toConsumableArray(createCaseInsensitiveTest(property$42, "all-petite-caps")), toConsumableArray(createCaseInsensitiveTest(property$42, "unicase")), toConsumableArray(createCaseInsensitiveTest(property$42, "titling-caps")));

var property$43 = "font-variant-position";
var fontVariantPosition = [].concat(toConsumableArray(globalTests(property$43)), toConsumableArray(createCaseInsensitiveTest(property$43, "normal")), toConsumableArray(createCaseInsensitiveTest(property$43, "sub")), toConsumableArray(createCaseInsensitiveTest(property$43, "super")));

var property$44 = "font-weight";
var fontWeight = [].concat(toConsumableArray(globalTests(property$44)), toConsumableArray(createCaseInsensitiveTest(property$44, "normal")), toConsumableArray(createCaseInsensitiveTest(property$44, "bold")), toConsumableArray(createCaseInsensitiveTest(property$44, "bolder")), toConsumableArray(createCaseInsensitiveTest(property$44, "lighter")), toConsumableArray(createCaseInsensitiveTest(property$44, "100")), toConsumableArray(createCaseInsensitiveTest(property$44, "200")), toConsumableArray(createCaseInsensitiveTest(property$44, "300")), toConsumableArray(createCaseInsensitiveTest(property$44, "400")), toConsumableArray(createCaseInsensitiveTest(property$44, "500")), toConsumableArray(createCaseInsensitiveTest(property$44, "600")), toConsumableArray(createCaseInsensitiveTest(property$44, "700")), toConsumableArray(createCaseInsensitiveTest(property$44, "800")), toConsumableArray(createCaseInsensitiveTest(property$44, "900")));

var gridColumnGap = ["grid-column-gap", "grid-row-gap", "motion-offset", "shape-margin"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }]));
  return suite;
}, []);

var property$45 = "grid-template-areas";
var gridTemplateAreas = [].concat(toConsumableArray(globalTests(property$45)), toConsumableArray(createCaseInsensitiveTest(property$45, "none")), [{
  property: property$45,
  value: "\"foo\"",
  valid: true
}, {
  property: property$45,
  value: "'bar'",
  valid: true
}, {
  property: property$45,
  value: "baz",
  valid: false
}, {
  property: property$45,
  value: "`quux`",
  valid: false
}]);

var hyphens = ["-webkit-hyphens", "-moz-hyphens", "-ms-hyphens", "hyphens"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "manual")), toConsumableArray(createCaseInsensitiveTest(property, "auto"))));
  return suite;
}, []);

var property$46 = "image-rendering";
var imageRendering = [].concat(toConsumableArray(globalTests(property$46)), toConsumableArray(createCaseInsensitiveTest(property$46, "auto")), toConsumableArray(createCaseInsensitiveTest(property$46, "crisp-edges")), toConsumableArray(createCaseInsensitiveTest(property$46, "pixelated")), toConsumableArray(createCaseInsensitiveTest(property$46, "-moz-crisp-edges")), toConsumableArray(createCaseInsensitiveTest(property$46, "-o-pixelated")));

var property$47 = "-ms-interpolation-mode";
var msInterpolationMode = [].concat(toConsumableArray(globalTests(property$47)), toConsumableArray(createCaseInsensitiveTest(property$47, "auto")), toConsumableArray(createCaseInsensitiveTest(property$47, "crisp-edges")), toConsumableArray(createCaseInsensitiveTest(property$47, "pixelated")), toConsumableArray(createCaseInsensitiveTest(property$47, "nearest-neighbor")));

var property$48 = "ime-mode";
var imeMode = [].concat(toConsumableArray(globalTests(property$48)), toConsumableArray(createCaseInsensitiveTest(property$48, "auto")), toConsumableArray(createCaseInsensitiveTest(property$48, "normal")), toConsumableArray(createCaseInsensitiveTest(property$48, "active")), toConsumableArray(createCaseInsensitiveTest(property$48, "inactive")), toConsumableArray(createCaseInsensitiveTest(property$48, "disabled")));

var property$49 = "initial-letter-align";
var initialLetterAlign = [].concat(toConsumableArray(globalTests(property$49)), toConsumableArray(createCaseInsensitiveTest(property$49, "auto")), toConsumableArray(createCaseInsensitiveTest(property$49, "alphabetic")), toConsumableArray(createCaseInsensitiveTest(property$49, "hanging")), toConsumableArray(createCaseInsensitiveTest(property$49, "ideographic")));

var property$50 = "isolation";
var isolation = [].concat(toConsumableArray(globalTests(property$50)), toConsumableArray(createCaseInsensitiveTest(property$50, "auto")), toConsumableArray(createCaseInsensitiveTest(property$50, "isolate")));

var mozBoxPack = ["-webkit-box-pack", "-moz-box-pack"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "space-between")), toConsumableArray(createCaseInsensitiveTest(property, "space-around")), toConsumableArray(createCaseInsensitiveTest(property, "start")), toConsumableArray(createCaseInsensitiveTest(property, "end")), toConsumableArray(createCaseInsensitiveTest(property, "justify"))));
  return suite;
}, []);

var justifyContent = ["-webkit-justify-content", "justify-content"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "space-between")), toConsumableArray(createCaseInsensitiveTest(property, "space-around"))));
  return suite;
}, []);

var property$51 = "-ms-flex-pack";
var msFlexPack = [].concat(toConsumableArray(globalTests(property$51)), toConsumableArray(createCaseInsensitiveTest(property$51, "flex-start")), toConsumableArray(createCaseInsensitiveTest(property$51, "flex-end")), toConsumableArray(createCaseInsensitiveTest(property$51, "center")), toConsumableArray(createCaseInsensitiveTest(property$51, "space-between")), toConsumableArray(createCaseInsensitiveTest(property$51, "space-around")), toConsumableArray(createCaseInsensitiveTest(property$51, "start")), toConsumableArray(createCaseInsensitiveTest(property$51, "end")), toConsumableArray(createCaseInsensitiveTest(property$51, "justify")), toConsumableArray(createCaseInsensitiveTest(property$51, "distribute")));

var property$52 = "letter-spacing";
var letterSpacing = [].concat(toConsumableArray(globalTests(property$52)), toConsumableArray(createCaseInsensitiveTest(property$52, "normal")), [{
  property: property$52,
  value: "0",
  valid: true
}, {
  property: property$52,
  value: "16px",
  valid: true
}, {
  property: property$52,
  value: "1pc",
  valid: true
}, {
  property: property$52,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$52,
  value: "16.px",
  valid: false
}, {
  property: property$52,
  value: "px16",
  valid: false
}, {
  property: property$52,
  value: "one rem",
  valid: false
}]);

var property$53 = "line-break";
var lineBreak = [].concat(toConsumableArray(globalTests(property$53)), toConsumableArray(createCaseInsensitiveTest(property$53, "auto")), toConsumableArray(createCaseInsensitiveTest(property$53, "loose")), toConsumableArray(createCaseInsensitiveTest(property$53, "normal")), toConsumableArray(createCaseInsensitiveTest(property$53, "strict")));

var property$54 = "line-height";
var lineHeight = [].concat(toConsumableArray(globalTests(property$54)), toConsumableArray(createCaseInsensitiveTest(property$54, "normal")), [{
  property: property$54,
  value: "12",
  valid: true
}, {
  property: property$54,
  value: "4.01",
  valid: true
}, {
  property: property$54,
  value: "-456.8",
  valid: true
}, {
  property: property$54,
  value: "0.0",
  valid: true
}, {
  property: property$54,
  value: "+0.0",
  valid: true
}, {
  property: property$54,
  value: "-0.0",
  valid: true
}, {
  property: property$54,
  value: ".60",
  valid: true
}, {
  property: property$54,
  value: "10e3",
  valid: true
}, {
  property: property$54,
  value: "-3.4e-2",
  valid: true
}, {
  property: property$54,
  value: "12.",
  valid: false
}, {
  property: property$54,
  value: "+-12.2",
  valid: false
}, {
  property: property$54,
  value: "12.1.1",
  valid: false
}, {
  property: property$54,
  value: "0",
  valid: true
}, {
  property: property$54,
  value: "16px",
  valid: true
}, {
  property: property$54,
  value: "1pc",
  valid: true
}, {
  property: property$54,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$54,
  value: "16.px",
  valid: false
}, {
  property: property$54,
  value: "px16",
  valid: false
}, {
  property: property$54,
  value: "one rem",
  valid: false
}, {
  property: property$54,
  value: "1%",
  valid: true
}, {
  property: property$54,
  value: "88%",
  valid: true
}, {
  property: property$54,
  value: "99.99%",
  valid: true
}, {
  property: property$54,
  value: "+100%",
  valid: true
}, {
  property: property$54,
  value: "12.%",
  valid: false
}, {
  property: property$54,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}]);

var property$55 = "list-style-position";
var listStylePosition = [].concat(toConsumableArray(globalTests(property$55)), toConsumableArray(createCaseInsensitiveTest(property$55, "inside")), toConsumableArray(createCaseInsensitiveTest(property$55, "outside")));

var property$56 = "mask-composite";
var maskComposite = [].concat(toConsumableArray(globalTests(property$56)), [{
  property: property$56,
  value: "add",
  valid: true
}, {
  property: property$56,
  value: "subtract",
  valid: true
}, {
  property: property$56,
  value: "intersect",
  valid: true
}, {
  property: property$56,
  value: "exclude",
  valid: true
}, {
  property: property$56,
  value: "ADD",
  valid: true
}, {
  property: property$56,
  value: "SUBTRACT",
  valid: true
}, {
  property: property$56,
  value: "INTERSECT",
  valid: true
}, {
  property: property$56,
  value: "EXCLUDE",
  valid: true
}, {
  property: property$56,
  value: "add-subtract",
  valid: false
}, {
  property: property$56,
  value: "add, add",
  valid: true
}, {
  property: property$56,
  value: "add, add,",
  valid: false
}, {
  property: property$56,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$56,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$57 = "mask-mode";
var maskMode = [].concat(toConsumableArray(globalTests(property$57)), [{
  property: property$57,
  value: "alpha",
  valid: true
}, {
  property: property$57,
  value: "luminance",
  valid: true
}, {
  property: property$57,
  value: "match-source",
  valid: true
}, {
  property: property$57,
  value: "ALPHA",
  valid: true
}, {
  property: property$57,
  value: "LUMINANCE",
  valid: true
}, {
  property: property$57,
  value: "MATCH-SOURCE",
  valid: true
}, {
  property: property$57,
  value: "jim-carrey",
  valid: false
}, {
  property: property$57,
  value: "alpha, alpha",
  valid: true
}, {
  property: property$57,
  value: "alpha, alpha,",
  valid: false
}, {
  property: property$57,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$57,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$58 = "mask-type";
var maskType = [].concat(toConsumableArray(globalTests(property$58)), toConsumableArray(createCaseInsensitiveTest(property$58, "luminance")), toConsumableArray(createCaseInsensitiveTest(property$58, "alpha")));

var maxBlockSize = ["max-block-size", "max-height", "max-inline-size", "max-width"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "max-content")), toConsumableArray(createCaseInsensitiveTest(property, "min-content")), toConsumableArray(createCaseInsensitiveTest(property, "fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "fill-available")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-max-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-max-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-min-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-min-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fill-available")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-available"))));
  return suite;
}, []);

var minBlockSize = ["min-block-size", "min-height", "min-inline-size", "min-width"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "max-content")), toConsumableArray(createCaseInsensitiveTest(property, "min-content")), toConsumableArray(createCaseInsensitiveTest(property, "fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "fill-available")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-max-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-max-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-min-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-min-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-fit-content")), toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fill-available")), toConsumableArray(createCaseInsensitiveTest(property, "-moz-available"))));
  return suite;
}, []);

var property$59 = "mix-blend-mode";
var mixBlendMode = [].concat(toConsumableArray(globalTests(property$59)), [{
  property: property$59,
  value: "normal",
  valid: true
}, {
  property: property$59,
  value: "multiply",
  valid: true
}, {
  property: property$59,
  value: "screen",
  valid: true
}, {
  property: property$59,
  value: "overlay",
  valid: true
}, {
  property: property$59,
  value: "darken",
  valid: true
}, {
  property: property$59,
  value: "lighten",
  valid: true
}, {
  property: property$59,
  value: "color-dodge",
  valid: true
}, {
  property: property$59,
  value: "color-burn",
  valid: true
}, {
  property: property$59,
  value: "hard-light",
  valid: true
}, {
  property: property$59,
  value: "soft-light",
  valid: true
}, {
  property: property$59,
  value: "difference",
  valid: true
}, {
  property: property$59,
  value: "exclusion",
  valid: true
}, {
  property: property$59,
  value: "hue",
  valid: true
}, {
  property: property$59,
  value: "saturation",
  valid: true
}, {
  property: property$59,
  value: "color",
  valid: true
}, {
  property: property$59,
  value: "luminosity",
  valid: true
}, {
  property: property$59,
  value: "NORMAL",
  valid: true
}, {
  property: property$59,
  value: "MULTIPLY",
  valid: true
}, {
  property: property$59,
  value: "SCREEN",
  valid: true
}, {
  property: property$59,
  value: "OVERLAY",
  valid: true
}, {
  property: property$59,
  value: "DARKEN",
  valid: true
}, {
  property: property$59,
  value: "LIGHTEN",
  valid: true
}, {
  property: property$59,
  value: "COLOR-DODGE",
  valid: true
}, {
  property: property$59,
  value: "COLOR-BURN",
  valid: true
}, {
  property: property$59,
  value: "HARD-LIGHT",
  valid: true
}, {
  property: property$59,
  value: "SOFT-LIGHT",
  valid: true
}, {
  property: property$59,
  value: "DIFFERENCE",
  valid: true
}, {
  property: property$59,
  value: "EXCLUSION",
  valid: true
}, {
  property: property$59,
  value: "HUE",
  valid: true
}, {
  property: property$59,
  value: "SATURATION",
  valid: true
}, {
  property: property$59,
  value: "COLOR",
  valid: true
}, {
  property: property$59,
  value: "LUMINOSITY",
  valid: true
}, {
  property: property$59,
  value: "superblend",
  valid: false
}, {
  property: property$59,
  value: "blend-man",
  valid: false
}]);

var objectFit = ["-o-object-fit", "object-fit"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "fill")), toConsumableArray(createCaseInsensitiveTest(property, "contain")), toConsumableArray(createCaseInsensitiveTest(property, "cover")), toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "scale-down"))));
  return suite;
}, []);

var property$60 = "outline-color";
var outlineColor = [].concat(toConsumableArray(globalTests(property$60)), [{
  property: property$60,
  value: "RGB(1, 2, 3)",
  valid: true
}, {
  property: property$60,
  value: "rgb(10%, 20%, 30%)",
  valid: true
}, {
  property: property$60,
  value: "rgb(400, 400, 400)",
  valid: true
}, {
  property: property$60,
  value: "rgbA(1, 2, 3, .5)",
  valid: true
}, {
  property: property$60,
  value: "rgba(10%, 20%, 30%, 0.5)",
  valid: true
}, {
  property: property$60,
  value: "rgba(400, 400, 400, 1)",
  valid: true
}, {
  property: property$60,
  value: "hsl(90, 50%, 50%)",
  valid: true
}, {
  property: property$60,
  value: "HSL(90, 50%, 50%)",
  valid: true
}, {
  property: property$60,
  value: "hsla(90, 50%, 50%, .5)",
  valid: true
}, {
  property: property$60,
  value: "hsla(90, 50%, 50%, 0.5)",
  valid: true
}, {
  property: property$60,
  value: "hslA(90, 50%, 50%, 0)",
  valid: true
}, {
  property: property$60,
  value: "#000",
  valid: true
}, {
  property: property$60,
  value: "#000F",
  valid: true
}, {
  property: property$60,
  value: "#000000",
  valid: true
}, {
  property: property$60,
  value: "#000000FF",
  valid: true
}, {
  property: property$60,
  value: "RED",
  valid: true
}, {
  property: property$60,
  value: "black",
  valid: true
}, {
  property: property$60,
  value: "currentcolor",
  valid: true
}, {
  property: property$60,
  value: "CURRENTCOLOR",
  valid: true
}, {
  property: property$60,
  value: "rgb(1, 2, 3, 4, 5)",
  valid: false
}, {
  property: property$60,
  value: "rgb(1:2:3)",
  valid: false
}, {
  property: property$60,
  value: "rgb(a, b, c)",
  valid: false
}, {
  property: property$60,
  value: "rgba(10%, 20%, 30%, transparent)",
  valid: false
}, {
  property: property$60,
  value: "rgba(400: 400)",
  valid: false
}, {
  property: property$60,
  value: "rgba(400, 400, 400, 50%)",
  valid: false
}, {
  property: property$60,
  value: "hsl(50%, 50%, 50%)",
  valid: false
}, {
  property: property$60,
  value: "hsl(90, 50, 50)",
  valid: false
}, {
  property: property$60,
  value: "hsla(90, 50%, 50%)",
  valid: false
}, {
  property: property$60,
  value: "hsla(90, 50%, 50%, 50%)",
  valid: false
}, {
  property: property$60,
  value: "hsla(90%, 50%, 50%, 0.5)",
  valid: false
}, {
  property: property$60,
  value: "#ee",
  valid: false
}, {
  property: property$60,
  value: "#eeeeeee",
  valid: false
}, {
  property: property$60,
  value: "#ggg",
  valid: false
}, {
  property: property$60,
  value: "blacklight",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$60, "invert")));

var property$61 = "outline-style";
var outlineStyle = [].concat(toConsumableArray(globalTests(property$61)), toConsumableArray(createCaseInsensitiveTest(property$61, "auto")), [{
  property: property$61,
  value: "none",
  valid: true
}, {
  property: property$61,
  value: "hidden",
  valid: true
}, {
  property: property$61,
  value: "dotted",
  valid: true
}, {
  property: property$61,
  value: "dashed",
  valid: true
}, {
  property: property$61,
  value: "solid",
  valid: true
}, {
  property: property$61,
  value: "double",
  valid: true
}, {
  property: property$61,
  value: "groove",
  valid: true
}, {
  property: property$61,
  value: "ridge",
  valid: true
}, {
  property: property$61,
  value: "inset",
  valid: true
}, {
  property: property$61,
  value: "outset",
  valid: true
}, {
  property: property$61,
  value: "NONE",
  valid: true
}, {
  property: property$61,
  value: "HIDDEN",
  valid: true
}, {
  property: property$61,
  value: "DOTTED",
  valid: true
}, {
  property: property$61,
  value: "DASHED",
  valid: true
}, {
  property: property$61,
  value: "SOLID",
  valid: true
}, {
  property: property$61,
  value: "DOUBLE",
  valid: true
}, {
  property: property$61,
  value: "GROOVE",
  valid: true
}, {
  property: property$61,
  value: "RIDGE",
  valid: true
}, {
  property: property$61,
  value: "INSET",
  valid: true
}, {
  property: property$61,
  value: "OUTSET",
  valid: true
}, {
  property: property$61,
  value: "groovy",
  valid: false
}]);

var overflow = ["overflow", "overflow-x", "overflow-y"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "visible")), toConsumableArray(createCaseInsensitiveTest(property, "hidden")), toConsumableArray(createCaseInsensitiveTest(property, "scroll")), toConsumableArray(createCaseInsensitiveTest(property, "auto"))));
  return suite;
}, []);

var property$62 = "overflow-clip-box";
var overflowClipBox = [].concat(toConsumableArray(globalTests(property$62)), toConsumableArray(createCaseInsensitiveTest(property$62, "padding-box")), toConsumableArray(createCaseInsensitiveTest(property$62, "content-box")));

var overflowWrap = ["overflow-wrap", "word-wrap"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "normal")), toConsumableArray(createCaseInsensitiveTest(property, "break-word"))));
  return suite;
}, []);

var paddingBlockEnd = ["padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }, {
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }]));
  return suite;
}, []);

var property$63 = "page-break-inside";
var pageBreakInside = [].concat(toConsumableArray(globalTests(property$63)), toConsumableArray(createCaseInsensitiveTest(property$63, "auto")), toConsumableArray(createCaseInsensitiveTest(property$63, "avoid")));

var perspective = ["-webkit-perspective", "-moz-perspective", "perspective"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "0",
    valid: true
  }, {
    property: property,
    value: "16px",
    valid: true
  }, {
    property: property,
    value: "1pc",
    valid: true
  }, {
    property: property,
    value: "2.34254645654324rem",
    valid: true
  }, {
    property: property,
    value: "16.px",
    valid: false
  }, {
    property: property,
    value: "px16",
    valid: false
  }, {
    property: property,
    value: "one rem",
    valid: false
  }]));
  return suite;
}, []);

var property$64 = "pointer-events";
var pointerEvents = [].concat(toConsumableArray(globalTests(property$64)), toConsumableArray(createCaseInsensitiveTest(property$64, "auto")), toConsumableArray(createCaseInsensitiveTest(property$64, "none")), toConsumableArray(createCaseInsensitiveTest(property$64, "visiblePainted")), toConsumableArray(createCaseInsensitiveTest(property$64, "visibleFill")), toConsumableArray(createCaseInsensitiveTest(property$64, "visibleStroke")), toConsumableArray(createCaseInsensitiveTest(property$64, "visible")), toConsumableArray(createCaseInsensitiveTest(property$64, "painted")), toConsumableArray(createCaseInsensitiveTest(property$64, "fill")), toConsumableArray(createCaseInsensitiveTest(property$64, "stroke")), toConsumableArray(createCaseInsensitiveTest(property$64, "all")), toConsumableArray(createCaseInsensitiveTest(property$64, "inherit")));

var property$65 = "position";
var position = [].concat(toConsumableArray(globalTests(property$65)), toConsumableArray(createCaseInsensitiveTest(property$65, "static")), toConsumableArray(createCaseInsensitiveTest(property$65, "relative")), toConsumableArray(createCaseInsensitiveTest(property$65, "absolute")), toConsumableArray(createCaseInsensitiveTest(property$65, "sticky")), toConsumableArray(createCaseInsensitiveTest(property$65, "fixed")), toConsumableArray(createCaseInsensitiveTest(property$65, "-webkit-sticky")));

var property$66 = "resize";
var resize = [].concat(toConsumableArray(globalTests(property$66)), toConsumableArray(createCaseInsensitiveTest(property$66, "none")), toConsumableArray(createCaseInsensitiveTest(property$66, "both")), toConsumableArray(createCaseInsensitiveTest(property$66, "horizontal")), toConsumableArray(createCaseInsensitiveTest(property$66, "vertical")));

var property$67 = "ruby-align";
var rubyAlign = [].concat(toConsumableArray(globalTests(property$67)), toConsumableArray(createCaseInsensitiveTest(property$67, "start")), toConsumableArray(createCaseInsensitiveTest(property$67, "center")), toConsumableArray(createCaseInsensitiveTest(property$67, "space-between")), toConsumableArray(createCaseInsensitiveTest(property$67, "space-around")));

var property$68 = "ruby-merge";
var rubyMerge = [].concat(toConsumableArray(globalTests(property$68)), toConsumableArray(createCaseInsensitiveTest(property$68, "separate")), toConsumableArray(createCaseInsensitiveTest(property$68, "collapse")), toConsumableArray(createCaseInsensitiveTest(property$68, "auto")));

var property$69 = "ruby-position";
var rubyPosition = [].concat(toConsumableArray(globalTests(property$69)), toConsumableArray(createCaseInsensitiveTest(property$69, "over")), toConsumableArray(createCaseInsensitiveTest(property$69, "under")), toConsumableArray(createCaseInsensitiveTest(property$69, "inter-character")));

var property$70 = "scroll-behavior";
var scrollBehavior = [].concat(toConsumableArray(globalTests(property$70)), toConsumableArray(createCaseInsensitiveTest(property$70, "auto")), toConsumableArray(createCaseInsensitiveTest(property$70, "smooth")));

var scrollSnapType = ["-webkit-scroll-snap-type", "-ms-scroll-snap-type", "scroll-snap-type", "scroll-snap-type-x", "scroll-snap-type-y"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "mandatory")), toConsumableArray(createCaseInsensitiveTest(property, "proximity"))));
  return suite;
}, []);

var property$71 = "tab-size";
var tabSize = [].concat(toConsumableArray(globalTests(property$71)), [{
  property: property$71,
  value: "10",
  valid: true
}, {
  property: property$71,
  value: "+10",
  valid: true
}, {
  property: property$71,
  value: "-10",
  valid: true
}, {
  property: property$71,
  value: "0",
  valid: true
}, {
  property: property$71,
  value: "+0",
  valid: true
}, {
  property: property$71,
  value: "-0",
  valid: true
}, {
  property: property$71,
  value: "12.0",
  valid: false
}, {
  property: property$71,
  value: "+---12",
  valid: false
}, {
  property: property$71,
  value: "3e4",
  valid: false
}, {
  property: property$71,
  value: "\\4E94",
  valid: false
}, {
  property: property$71,
  value: "_5",
  valid: false
}, {
  property: property$71,
  value: "0",
  valid: true
}, {
  property: property$71,
  value: "16px",
  valid: true
}, {
  property: property$71,
  value: "1pc",
  valid: true
}, {
  property: property$71,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$71,
  value: "16.px",
  valid: false
}, {
  property: property$71,
  value: "px16",
  valid: false
}, {
  property: property$71,
  value: "one rem",
  valid: false
}]);

var property$72 = "table-layout";
var tableLayout = [].concat(toConsumableArray(globalTests(property$72)), toConsumableArray(createCaseInsensitiveTest(property$72, "auto")), toConsumableArray(createCaseInsensitiveTest(property$72, "fixed")));

var property$73 = "text-align";
var textAlign = [].concat(toConsumableArray(globalTests(property$73)), toConsumableArray(createCaseInsensitiveTest(property$73, "start")), toConsumableArray(createCaseInsensitiveTest(property$73, "end")), toConsumableArray(createCaseInsensitiveTest(property$73, "left")), toConsumableArray(createCaseInsensitiveTest(property$73, "right")), toConsumableArray(createCaseInsensitiveTest(property$73, "center")), toConsumableArray(createCaseInsensitiveTest(property$73, "justify")), toConsumableArray(createCaseInsensitiveTest(property$73, "match-parent")));

var textAlignLast = ["-moz-text-align-last", "text-align-last"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "start")), toConsumableArray(createCaseInsensitiveTest(property, "end")), toConsumableArray(createCaseInsensitiveTest(property, "left")), toConsumableArray(createCaseInsensitiveTest(property, "right")), toConsumableArray(createCaseInsensitiveTest(property, "center")), toConsumableArray(createCaseInsensitiveTest(property, "justify"))));
  return suite;
}, []);

var textDecorationStyle = ["-webkit-text-decoration-style", "-moz-text-decoration-style", "text-decoration-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "solid")), toConsumableArray(createCaseInsensitiveTest(property, "double")), toConsumableArray(createCaseInsensitiveTest(property, "dotted")), toConsumableArray(createCaseInsensitiveTest(property, "dashed")), toConsumableArray(createCaseInsensitiveTest(property, "wavy"))));
  return suite;
}, []);

var property$74 = "text-orientation";
var textOrientation = [].concat(toConsumableArray(globalTests(property$74)), toConsumableArray(createCaseInsensitiveTest(property$74, "mixed")), toConsumableArray(createCaseInsensitiveTest(property$74, "upright")), toConsumableArray(createCaseInsensitiveTest(property$74, "sideways")));

var property$75 = "text-rendering";
var textRendering = [].concat(toConsumableArray(globalTests(property$75)), toConsumableArray(createCaseInsensitiveTest(property$75, "auto")), toConsumableArray(createCaseInsensitiveTest(property$75, "optimizeSpeed")), toConsumableArray(createCaseInsensitiveTest(property$75, "optimizeLegibility")), toConsumableArray(createCaseInsensitiveTest(property$75, "geometricPrecision")));

var textSizeAdjust = ["-webkit-text-size-adjust", "-moz-text-size-adjust", "-ms-text-size-adjust", "text-size-adjust"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "1%",
    valid: true
  }, {
    property: property,
    value: "88%",
    valid: true
  }, {
    property: property,
    value: "99.99%",
    valid: true
  }, {
    property: property,
    value: "+100%",
    valid: true
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }]));
  return suite;
}, []);

var property$76 = "text-transform";
var textTransform = [].concat(toConsumableArray(globalTests(property$76)), toConsumableArray(createCaseInsensitiveTest(property$76, "none")), toConsumableArray(createCaseInsensitiveTest(property$76, "capitalize")), toConsumableArray(createCaseInsensitiveTest(property$76, "uppercase")), toConsumableArray(createCaseInsensitiveTest(property$76, "lowercase")), toConsumableArray(createCaseInsensitiveTest(property$76, "full-width")));

var property$77 = "transform-box";
var transformBox = [].concat(toConsumableArray(globalTests(property$77)), toConsumableArray(createCaseInsensitiveTest(property$77, "border-box")), toConsumableArray(createCaseInsensitiveTest(property$77, "fill-box")), toConsumableArray(createCaseInsensitiveTest(property$77, "view-box")));

var transformStyle = ["-webkit-transform-style", "-moz-transform-style", "transform-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flat")), toConsumableArray(createCaseInsensitiveTest(property, "preserve-3d"))));
  return suite;
}, []);

var property$78 = "unicode-bidi";
var unicodeBidi = [].concat(toConsumableArray(globalTests(property$78)), toConsumableArray(createCaseInsensitiveTest(property$78, "normal")), toConsumableArray(createCaseInsensitiveTest(property$78, "embed")), toConsumableArray(createCaseInsensitiveTest(property$78, "isolate")), toConsumableArray(createCaseInsensitiveTest(property$78, "bidi-override")), toConsumableArray(createCaseInsensitiveTest(property$78, "isolate-override")), toConsumableArray(createCaseInsensitiveTest(property$78, "plaintext")));

var userSelect = ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), toConsumableArray(createCaseInsensitiveTest(property, "text")), toConsumableArray(createCaseInsensitiveTest(property, "none")), toConsumableArray(createCaseInsensitiveTest(property, "contain")), toConsumableArray(createCaseInsensitiveTest(property, "all"))));
  return suite;
}, []);

var property$79 = "vertical-align";
var verticalAlign = [].concat(toConsumableArray(globalTests(property$79)), toConsumableArray(createCaseInsensitiveTest(property$79, "baseline")), toConsumableArray(createCaseInsensitiveTest(property$79, "sub")), toConsumableArray(createCaseInsensitiveTest(property$79, "super")), toConsumableArray(createCaseInsensitiveTest(property$79, "text-top")), toConsumableArray(createCaseInsensitiveTest(property$79, "text-bottom")), toConsumableArray(createCaseInsensitiveTest(property$79, "middle")), toConsumableArray(createCaseInsensitiveTest(property$79, "top")), toConsumableArray(createCaseInsensitiveTest(property$79, "bottom")), [{
  property: property$79,
  value: "1%",
  valid: true
}, {
  property: property$79,
  value: "88%",
  valid: true
}, {
  property: property$79,
  value: "99.99%",
  valid: true
}, {
  property: property$79,
  value: "+100%",
  valid: true
}, {
  property: property$79,
  value: "12.%",
  valid: false
}, {
  property: property$79,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}, {
  property: property$79,
  value: "0",
  valid: true
}, {
  property: property$79,
  value: "16px",
  valid: true
}, {
  property: property$79,
  value: "1pc",
  valid: true
}, {
  property: property$79,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$79,
  value: "16.px",
  valid: false
}, {
  property: property$79,
  value: "px16",
  valid: false
}, {
  property: property$79,
  value: "one rem",
  valid: false
}]);

var property$80 = "visibility";
var visibility = [].concat(toConsumableArray(globalTests(property$80)), toConsumableArray(createCaseInsensitiveTest(property$80, "visible")), toConsumableArray(createCaseInsensitiveTest(property$80, "hidden")), toConsumableArray(createCaseInsensitiveTest(property$80, "collapse")));

var property$81 = "white-space";
var whiteSpace = [].concat(toConsumableArray(globalTests(property$81)), toConsumableArray(createCaseInsensitiveTest(property$81, "normal")), toConsumableArray(createCaseInsensitiveTest(property$81, "pre")), toConsumableArray(createCaseInsensitiveTest(property$81, "nowrap")), toConsumableArray(createCaseInsensitiveTest(property$81, "pre-wrap")), toConsumableArray(createCaseInsensitiveTest(property$81, "pre-line")));

var property$82 = "will-change";
var willChange = [].concat(toConsumableArray(globalTests(property$82)), toConsumableArray(createCaseInsensitiveTest(property$82, "auto")), [{
  property: property$82,
  value: "Bond-007",
  valid: true
}, {
  property: property$82,
  value: "alpha",
  valid: true
}, {
  property: property$82,
  value: "_-_",
  valid: true
}, {
  property: property$82,
  value: "\\1F638",
  valid: true
}, {
  property: property$82,
  value: "-B",
  valid: true
}, {
  property: property$82,
  value: "NONE",
  valid: true
}, {
  property: property$82,
  value: "007-Bond",
  valid: false
}, {
  property: property$82,
  value: "0B",
  valid: false
}, {
  property: property$82,
  value: "--B",
  valid: false
}, {
  property: property$82,
  value: "-0",
  valid: false
}, {
  property: property$82,
  value: "Bond-007, Bond-007",
  valid: true
}, {
  property: property$82,
  value: "Bond-007, Bond-007,",
  valid: false
}, {
  property: property$82,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$82,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$83 = "word-break";
var wordBreak = [].concat(toConsumableArray(globalTests(property$83)), toConsumableArray(createCaseInsensitiveTest(property$83, "normal")), toConsumableArray(createCaseInsensitiveTest(property$83, "break-all")), toConsumableArray(createCaseInsensitiveTest(property$83, "keep-all")));

var property$84 = "word-spacing";
var wordSpacing = [].concat(toConsumableArray(globalTests(property$84)), toConsumableArray(createCaseInsensitiveTest(property$84, "normal")), [{
  property: property$84,
  value: "0",
  valid: true
}, {
  property: property$84,
  value: "16px",
  valid: true
}, {
  property: property$84,
  value: "1pc",
  valid: true
}, {
  property: property$84,
  value: "2.34254645654324rem",
  valid: true
}, {
  property: property$84,
  value: "1%",
  valid: true
}, {
  property: property$84,
  value: "88%",
  valid: true
}, {
  property: property$84,
  value: "99.99%",
  valid: true
}, {
  property: property$84,
  value: "+100%",
  valid: true
}, {
  property: property$84,
  value: "16.px",
  valid: false
}, {
  property: property$84,
  value: "px16",
  valid: false
}, {
  property: property$84,
  value: "one rem",
  valid: false
}, {
  property: property$84,
  value: "12.%",
  valid: false
}, {
  property: property$84,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}]);

var writingMode = ["-webkit-writing-mode", "writing-mode"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "horizontal-tb")), toConsumableArray(createCaseInsensitiveTest(property, "vertical-rl")), toConsumableArray(createCaseInsensitiveTest(property, "vertical-lr")), toConsumableArray(createCaseInsensitiveTest(property, "sideways-rl")), toConsumableArray(createCaseInsensitiveTest(property, "sideways-lr"))));
  return suite;
}, []);

var property$85 = "-ms-writing-mode";
var msWritingMode = [].concat(toConsumableArray(globalTests(property$85)), toConsumableArray(createCaseInsensitiveTest(property$85, "horizontal-tb")), toConsumableArray(createCaseInsensitiveTest(property$85, "vertical-rl")), toConsumableArray(createCaseInsensitiveTest(property$85, "vertical-lr")), toConsumableArray(createCaseInsensitiveTest(property$85, "sideways-rl")), toConsumableArray(createCaseInsensitiveTest(property$85, "sideways-lr")), toConsumableArray(createCaseInsensitiveTest(property$85, "lr-tb")), toConsumableArray(createCaseInsensitiveTest(property$85, "tb-rl")), toConsumableArray(createCaseInsensitiveTest(property$85, "tb-lr")));

var property$86 = "z-index";
var zIndex = [].concat(toConsumableArray(globalTests(property$86)), toConsumableArray(createCaseInsensitiveTest(property$86, "auto")), [{
  property: property$86,
  value: "10",
  valid: true
}, {
  property: property$86,
  value: "+10",
  valid: true
}, {
  property: property$86,
  value: "-10",
  valid: true
}, {
  property: property$86,
  value: "0",
  valid: true
}, {
  property: property$86,
  value: "+0",
  valid: true
}, {
  property: property$86,
  value: "-0",
  valid: true
}, {
  property: property$86,
  value: "12.0",
  valid: false
}, {
  property: property$86,
  value: "+---12",
  valid: false
}, {
  property: property$86,
  value: "3e4",
  valid: false
}, {
  property: property$86,
  value: "\\4E94",
  valid: false
}, {
  property: property$86,
  value: "_5",
  valid: false
}]);

var suites = [msOverflowStyle, mozAppearance, mozFloatEdge, mozForceBrokenImageIcon, mozOrient, mozStackSizing, mozTextBlink, mozUserFocus, mozUserInput, mozUserModify, mozWindowShadow, webkitBorderBeforeColor, webkitBorderBeforeStyle, webkitBorderBeforeWidth, webkitMaskRepeat, webkitMaskRepeatX, webkitTapHighlightColor, webkitTextStrokeWidth, webkitTouchCallout, alignContent, msFlexLinePack, msFlexAlign, alignItems, alignSelf, msFlexItemAlign, all, animationDelay, animationDirection, animationFillMode, animationName, animationPlayState, animationTimingFunction, appearance, backfaceVisibility, backgroundAttachment, backgroundBlendMode, backgroundClip, borderBottomLeftRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, bottom, boxAlign, boxDecorationBreak, boxDirection, boxFlex, boxLines, boxOrient, boxPack, boxSizing, boxSuppress, pageBreakAfter, webkitColumnBreakInside, captionSide, clear, columnCount, columnFill, columnGap, columnSpan, columnWidth, direction, display, displayInside, displayList, displayOutside, emptyCells, mozBoxOrient, mozBoxDirection, flexDirection, flexWrap, float, fontKerning, fontLanguageOverride, fontSize, fontSizeAdjust, fontStretch, fontStyle, fontVariantCaps, fontVariantPosition, fontWeight, gridColumnGap, gridTemplateAreas, hyphens, imageRendering, msInterpolationMode, imeMode, initialLetterAlign, isolation, mozBoxPack, justifyContent, msFlexPack, letterSpacing, lineBreak, lineHeight, listStylePosition, maskComposite, maskMode, maskType, maxBlockSize, minBlockSize, mixBlendMode, objectFit, outlineColor, outlineStyle, overflow, overflowClipBox, overflowWrap, paddingBlockEnd, pageBreakInside, perspective, pointerEvents, position, resize, rubyAlign, rubyMerge, rubyPosition, scrollBehavior, scrollSnapType, tabSize, tableLayout, textAlign, textAlignLast, textDecorationStyle, textOrientation, textRendering, textSizeAdjust, textTransform, transformBox, transformStyle, unicodeBidi, userSelect, verticalAlign, visibility, whiteSpace, willChange, wordBreak, wordSpacing, writingMode, msWritingMode, zIndex];

suites.forEach(function (suite) {
  suite.forEach(function (_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var valid = _ref.valid;

    test(property + ': ' + value, function (t) {
      t.deepEqual(cssValues(property, value), valid);
    });
  });
});