import test from 'ava';
import valueParser from 'postcss-value-parser';
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
var msOverflowStyle = [].concat(toConsumableArray(globalTests(property)), toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
  property: property,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
  property: property,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property, "scrollbar")), [{
  property: property,
  value: "scrollbar scrollbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property, "-ms-autohiding-scrollbar")), [{
  property: property,
  value: "-ms-autohiding-scrollbar -ms-autohiding-scrollbar",
  valid: false
}]);

var property$1 = "-moz-appearance";
var mozAppearance = [].concat(toConsumableArray(globalTests(property$1)), toConsumableArray(createCaseInsensitiveTest(property$1, "none")), [{
  property: property$1,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button")), [{
  property: property$1,
  value: "button button",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-down")), [{
  property: property$1,
  value: "button-arrow-down button-arrow-down",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-next")), [{
  property: property$1,
  value: "button-arrow-next button-arrow-next",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-previous")), [{
  property: property$1,
  value: "button-arrow-previous button-arrow-previous",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-arrow-up")), [{
  property: property$1,
  value: "button-arrow-up button-arrow-up",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-bevel")), [{
  property: property$1,
  value: "button-bevel button-bevel",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "button-focus")), [{
  property: property$1,
  value: "button-focus button-focus",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "caret")), [{
  property: property$1,
  value: "caret caret",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox")), [{
  property: property$1,
  value: "checkbox checkbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox-container")), [{
  property: property$1,
  value: "checkbox-container checkbox-container",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "checkbox-label")), [{
  property: property$1,
  value: "checkbox-label checkbox-label",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "checkmenuitem")), [{
  property: property$1,
  value: "checkmenuitem checkmenuitem",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "dualbutton")), [{
  property: property$1,
  value: "dualbutton dualbutton",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "groupbox")), [{
  property: property$1,
  value: "groupbox groupbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "listbox")), [{
  property: property$1,
  value: "listbox listbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "listitem")), [{
  property: property$1,
  value: "listitem listitem",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuarrow")), [{
  property: property$1,
  value: "menuarrow menuarrow",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menubar")), [{
  property: property$1,
  value: "menubar menubar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menucheckbox")), [{
  property: property$1,
  value: "menucheckbox menucheckbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuimage")), [{
  property: property$1,
  value: "menuimage menuimage",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuitem")), [{
  property: property$1,
  value: "menuitem menuitem",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuitemtext")), [{
  property: property$1,
  value: "menuitemtext menuitemtext",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menulist")), [{
  property: property$1,
  value: "menulist menulist",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-button")), [{
  property: property$1,
  value: "menulist-button menulist-button",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-text")), [{
  property: property$1,
  value: "menulist-text menulist-text",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menulist-textfield")), [{
  property: property$1,
  value: "menulist-textfield menulist-textfield",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menupopup")), [{
  property: property$1,
  value: "menupopup menupopup",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuradio")), [{
  property: property$1,
  value: "menuradio menuradio",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "menuseparator")), [{
  property: property$1,
  value: "menuseparator menuseparator",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "meterbar")), [{
  property: property$1,
  value: "meterbar meterbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "meterchunk")), [{
  property: property$1,
  value: "meterchunk meterchunk",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "progressbar")), [{
  property: property$1,
  value: "progressbar progressbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "progressbar-vertical")), [{
  property: property$1,
  value: "progressbar-vertical progressbar-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "progresschunk")), [{
  property: property$1,
  value: "progresschunk progresschunk",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "progresschunk-vertical")), [{
  property: property$1,
  value: "progresschunk-vertical progresschunk-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "radio")), [{
  property: property$1,
  value: "radio radio",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "radio-container")), [{
  property: property$1,
  value: "radio-container radio-container",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "radio-label")), [{
  property: property$1,
  value: "radio-label radio-label",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "radiomenuitem")), [{
  property: property$1,
  value: "radiomenuitem radiomenuitem",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "range")), [{
  property: property$1,
  value: "range range",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "range-thumb")), [{
  property: property$1,
  value: "range-thumb range-thumb",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "resizer")), [{
  property: property$1,
  value: "resizer resizer",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "resizerpanel")), [{
  property: property$1,
  value: "resizerpanel resizerpanel",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scale-horizontal")), [{
  property: property$1,
  value: "scale-horizontal scale-horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbend")), [{
  property: property$1,
  value: "scalethumbend scalethumbend",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumb-horizontal")), [{
  property: property$1,
  value: "scalethumb-horizontal scalethumb-horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbstart")), [{
  property: property$1,
  value: "scalethumbstart scalethumbstart",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumbtick")), [{
  property: property$1,
  value: "scalethumbtick scalethumbtick",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scalethumb-vertical")), [{
  property: property$1,
  value: "scalethumb-vertical scalethumb-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scale-vertical")), [{
  property: property$1,
  value: "scale-vertical scale-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-down")), [{
  property: property$1,
  value: "scrollbarbutton-down scrollbarbutton-down",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-left")), [{
  property: property$1,
  value: "scrollbarbutton-left scrollbarbutton-left",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-right")), [{
  property: property$1,
  value: "scrollbarbutton-right scrollbarbutton-right",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarbutton-up")), [{
  property: property$1,
  value: "scrollbarbutton-up scrollbarbutton-up",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarthumb-horizontal")), [{
  property: property$1,
  value: "scrollbarthumb-horizontal scrollbarthumb-horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbarthumb-vertical")), [{
  property: property$1,
  value: "scrollbarthumb-vertical scrollbarthumb-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbartrack-horizontal")), [{
  property: property$1,
  value: "scrollbartrack-horizontal scrollbartrack-horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "scrollbartrack-vertical")), [{
  property: property$1,
  value: "scrollbartrack-vertical scrollbartrack-vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "searchfield")), [{
  property: property$1,
  value: "searchfield searchfield",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "separator")), [{
  property: property$1,
  value: "separator separator",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "sheet")), [{
  property: property$1,
  value: "sheet sheet",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "spinner")), [{
  property: property$1,
  value: "spinner spinner",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-downbutton")), [{
  property: property$1,
  value: "spinner-downbutton spinner-downbutton",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-textfield")), [{
  property: property$1,
  value: "spinner-textfield spinner-textfield",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "spinner-upbutton")), [{
  property: property$1,
  value: "spinner-upbutton spinner-upbutton",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "splitter")), [{
  property: property$1,
  value: "splitter splitter",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "statusbar")), [{
  property: property$1,
  value: "statusbar statusbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "statusbarpanel")), [{
  property: property$1,
  value: "statusbarpanel statusbarpanel",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tab")), [{
  property: property$1,
  value: "tab tab",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tabpanel")), [{
  property: property$1,
  value: "tabpanel tabpanel",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tabpanels")), [{
  property: property$1,
  value: "tabpanels tabpanels",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tab-scroll-arrow-back")), [{
  property: property$1,
  value: "tab-scroll-arrow-back tab-scroll-arrow-back",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tab-scroll-arrow-forward")), [{
  property: property$1,
  value: "tab-scroll-arrow-forward tab-scroll-arrow-forward",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "textfield")), [{
  property: property$1,
  value: "textfield textfield",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "textfield-multiline")), [{
  property: property$1,
  value: "textfield-multiline textfield-multiline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "toolbar")), [{
  property: property$1,
  value: "toolbar toolbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "toolbarbutton")), [{
  property: property$1,
  value: "toolbarbutton toolbarbutton",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "toolbarbutton-dropdown")), [{
  property: property$1,
  value: "toolbarbutton-dropdown toolbarbutton-dropdown",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "toolbargripper")), [{
  property: property$1,
  value: "toolbargripper toolbargripper",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "toolbox")), [{
  property: property$1,
  value: "toolbox toolbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "tooltip")), [{
  property: property$1,
  value: "tooltip tooltip",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeheader")), [{
  property: property$1,
  value: "treeheader treeheader",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeheadercell")), [{
  property: property$1,
  value: "treeheadercell treeheadercell",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeheadersortarrow")), [{
  property: property$1,
  value: "treeheadersortarrow treeheadersortarrow",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeitem")), [{
  property: property$1,
  value: "treeitem treeitem",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeline")), [{
  property: property$1,
  value: "treeline treeline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treetwisty")), [{
  property: property$1,
  value: "treetwisty treetwisty",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treetwistyopen")), [{
  property: property$1,
  value: "treetwistyopen treetwistyopen",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "treeview")), [{
  property: property$1,
  value: "treeview treeview",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-mac-unified-toolbar")), [{
  property: property$1,
  value: "-moz-mac-unified-toolbar -moz-mac-unified-toolbar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-borderless-glass")), [{
  property: property$1,
  value: "-moz-win-borderless-glass -moz-win-borderless-glass",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-browsertabbar-toolbox")), [{
  property: property$1,
  value: "-moz-win-browsertabbar-toolbox -moz-win-browsertabbar-toolbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-communicationstext")), [{
  property: property$1,
  value: "-moz-win-communicationstext -moz-win-communicationstext",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-communications-toolbox")), [{
  property: property$1,
  value: "-moz-win-communications-toolbox -moz-win-communications-toolbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-exclude-glass")), [{
  property: property$1,
  value: "-moz-win-exclude-glass -moz-win-exclude-glass",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-glass")), [{
  property: property$1,
  value: "-moz-win-glass -moz-win-glass",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-mediatext")), [{
  property: property$1,
  value: "-moz-win-mediatext -moz-win-mediatext",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-win-media-toolbox")), [{
  property: property$1,
  value: "-moz-win-media-toolbox -moz-win-media-toolbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-box")), [{
  property: property$1,
  value: "-moz-window-button-box -moz-window-button-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-box-maximized")), [{
  property: property$1,
  value: "-moz-window-button-box-maximized -moz-window-button-box-maximized",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-close")), [{
  property: property$1,
  value: "-moz-window-button-close -moz-window-button-close",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-maximize")), [{
  property: property$1,
  value: "-moz-window-button-maximize -moz-window-button-maximize",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-minimize")), [{
  property: property$1,
  value: "-moz-window-button-minimize -moz-window-button-minimize",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-button-restore")), [{
  property: property$1,
  value: "-moz-window-button-restore -moz-window-button-restore",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-bottom")), [{
  property: property$1,
  value: "-moz-window-frame-bottom -moz-window-frame-bottom",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-left")), [{
  property: property$1,
  value: "-moz-window-frame-left -moz-window-frame-left",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-frame-right")), [{
  property: property$1,
  value: "-moz-window-frame-right -moz-window-frame-right",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-titlebar")), [{
  property: property$1,
  value: "-moz-window-titlebar -moz-window-titlebar",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$1, "-moz-window-titlebar-maximized")), [{
  property: property$1,
  value: "-moz-window-titlebar-maximized -moz-window-titlebar-maximized",
  valid: false
}]);

var property$2 = "-moz-float-edge";
var mozFloatEdge = [].concat(toConsumableArray(globalTests(property$2)), toConsumableArray(createCaseInsensitiveTest(property$2, "border-box")), [{
  property: property$2,
  value: "border-box border-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$2, "content-box")), [{
  property: property$2,
  value: "content-box content-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$2, "margin-box")), [{
  property: property$2,
  value: "margin-box margin-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$2, "padding-box")), [{
  property: property$2,
  value: "padding-box padding-box",
  valid: false
}]);

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
  }, {
    property: property,
    value: "\"100\"",
    valid: false
  }, {
    property: property,
    value: "10 10",
    valid: false
  }]));
  return suite;
}, []);

var property$3 = "-moz-orient";
var mozOrient = [].concat(toConsumableArray(globalTests(property$3)), toConsumableArray(createCaseInsensitiveTest(property$3, "inline")), [{
  property: property$3,
  value: "inline inline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$3, "block")), [{
  property: property$3,
  value: "block block",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$3, "horizontal")), [{
  property: property$3,
  value: "horizontal horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$3, "vertical")), [{
  property: property$3,
  value: "vertical vertical",
  valid: false
}]);

var property$4 = "-moz-stack-sizing";
var mozStackSizing = [].concat(toConsumableArray(globalTests(property$4)), toConsumableArray(createCaseInsensitiveTest(property$4, "ignore")), [{
  property: property$4,
  value: "ignore ignore",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$4, "stretch-to-fit")), [{
  property: property$4,
  value: "stretch-to-fit stretch-to-fit",
  valid: false
}]);

var property$5 = "-moz-text-blink";
var mozTextBlink = [].concat(toConsumableArray(globalTests(property$5)), toConsumableArray(createCaseInsensitiveTest(property$5, "none")), [{
  property: property$5,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$5, "blink")), [{
  property: property$5,
  value: "blink blink",
  valid: false
}]);

var property$6 = "-moz-user-focus";
var mozUserFocus = [].concat(toConsumableArray(globalTests(property$6)), toConsumableArray(createCaseInsensitiveTest(property$6, "ignore")), [{
  property: property$6,
  value: "ignore ignore",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "normal")), [{
  property: property$6,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "select-after")), [{
  property: property$6,
  value: "select-after select-after",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "select-before")), [{
  property: property$6,
  value: "select-before select-before",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "select-menu")), [{
  property: property$6,
  value: "select-menu select-menu",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "select-same")), [{
  property: property$6,
  value: "select-same select-same",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "select-all")), [{
  property: property$6,
  value: "select-all select-all",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$6, "none")), [{
  property: property$6,
  value: "none none",
  valid: false
}]);

var property$7 = "-moz-user-input";
var mozUserInput = [].concat(toConsumableArray(globalTests(property$7)), toConsumableArray(createCaseInsensitiveTest(property$7, "none")), [{
  property: property$7,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$7, "enabled")), [{
  property: property$7,
  value: "enabled enabled",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$7, "disabled")), [{
  property: property$7,
  value: "disabled disabled",
  valid: false
}]);

var property$8 = "-moz-user-modify";
var mozUserModify = [].concat(toConsumableArray(globalTests(property$8)), toConsumableArray(createCaseInsensitiveTest(property$8, "read-only")), [{
  property: property$8,
  value: "read-only read-only",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$8, "read-write")), [{
  property: property$8,
  value: "read-write read-write",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$8, "write-only")), [{
  property: property$8,
  value: "write-only write-only",
  valid: false
}]);

var property$9 = "-moz-window-shadow";
var mozWindowShadow = [].concat(toConsumableArray(globalTests(property$9)), toConsumableArray(createCaseInsensitiveTest(property$9, "default")), [{
  property: property$9,
  value: "default default",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$9, "menu")), [{
  property: property$9,
  value: "menu menu",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$9, "tooltip")), [{
  property: property$9,
  value: "tooltip tooltip",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$9, "sheet")), [{
  property: property$9,
  value: "sheet sheet",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$9, "none")), [{
  property: property$9,
  value: "none none",
  valid: false
}]);

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
  }, {
    property: property,
    value: "RGB(1, 2, 3) RGB(1, 2, 3)",
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
  }, {
    property: property,
    value: "none none",
    valid: true
  }, {
    property: property,
    value: "none, none",
    valid: false
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
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
  }, {
    property: property,
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "thin thin",
    valid: true
  }, {
    property: property,
    value: "thin, thin",
    valid: false
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
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
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "repeat")), [{
    property: property,
    value: "repeat repeat",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "no-repeat")), [{
    property: property,
    value: "no-repeat no-repeat",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space")), [{
    property: property,
    value: "space space",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "round")), [{
    property: property,
    value: "round round",
    valid: false
  }]));
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
  }, {
    property: property,
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: false
  }]));
  return suite;
}, []);

var property$11 = "-webkit-touch-callout";
var webkitTouchCallout = [].concat(toConsumableArray(globalTests(property$11)), toConsumableArray(createCaseInsensitiveTest(property$11, "default")), [{
  property: property$11,
  value: "default default",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$11, "none")), [{
  property: property$11,
  value: "none none",
  valid: false
}]);

var alignContent = ["-webkit-align-content", "align-content"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-between")), [{
    property: property,
    value: "space-between space-between",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-around")), [{
    property: property,
    value: "space-around space-around",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "stretch")), [{
    property: property,
    value: "stretch stretch",
    valid: false
  }]));
  return suite;
}, []);

var property$12 = "-ms-flex-line-pack";
var msFlexLinePack = [].concat(toConsumableArray(globalTests(property$12)), toConsumableArray(createCaseInsensitiveTest(property$12, "flex-start")), [{
  property: property$12,
  value: "flex-start flex-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "flex-end")), [{
  property: property$12,
  value: "flex-end flex-end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "center")), [{
  property: property$12,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "space-between")), [{
  property: property$12,
  value: "space-between space-between",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "space-around")), [{
  property: property$12,
  value: "space-around space-around",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "stretch")), [{
  property: property$12,
  value: "stretch stretch",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "start")), [{
  property: property$12,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "end")), [{
  property: property$12,
  value: "end end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "justify")), [{
  property: property$12,
  value: "justify justify",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$12, "distribute")), [{
  property: property$12,
  value: "distribute distribute",
  valid: false
}]);

var msFlexAlign = ["-webkit-box-align", "-moz-box-align", "-ms-flex-align"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "baseline")), [{
    property: property,
    value: "baseline baseline",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "stretch")), [{
    property: property,
    value: "stretch stretch",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "start")), [{
    property: property,
    value: "start start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "end")), [{
    property: property,
    value: "end end",
    valid: false
  }]));
  return suite;
}, []);

var alignItems = ["-webkit-align-items", "-ms-grid-row-align", "align-items"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "baseline")), [{
    property: property,
    value: "baseline baseline",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "stretch")), [{
    property: property,
    value: "stretch stretch",
    valid: false
  }]));
  return suite;
}, []);

var alignSelf = ["-webkit-align-self", "align-self"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "baseline")), [{
    property: property,
    value: "baseline baseline",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "stretch")), [{
    property: property,
    value: "stretch stretch",
    valid: false
  }]));
  return suite;
}, []);

var property$13 = "-ms-flex-item-align";
var msFlexItemAlign = [].concat(toConsumableArray(globalTests(property$13)), toConsumableArray(createCaseInsensitiveTest(property$13, "auto")), [{
  property: property$13,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "flex-start")), [{
  property: property$13,
  value: "flex-start flex-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "flex-end")), [{
  property: property$13,
  value: "flex-end flex-end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "center")), [{
  property: property$13,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "baseline")), [{
  property: property$13,
  value: "baseline baseline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "stretch")), [{
  property: property$13,
  value: "stretch stretch",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "start")), [{
  property: property$13,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$13, "end")), [{
  property: property$13,
  value: "end end",
  valid: false
}]);

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

var property$14 = "animation-direction";
var animationDirection = [].concat(toConsumableArray(globalTests(property$14)), [{
  property: property$14,
  value: "normal",
  valid: true
}, {
  property: property$14,
  value: "reverse",
  valid: true
}, {
  property: property$14,
  value: "alternate",
  valid: true
}, {
  property: property$14,
  value: "alternate-reverse",
  valid: true
}, {
  property: property$14,
  value: "NORMAL",
  valid: true
}, {
  property: property$14,
  value: "REVERSE",
  valid: true
}, {
  property: property$14,
  value: "ALTERNATE",
  valid: true
}, {
  property: property$14,
  value: "ALTERNATE-REVERSE",
  valid: true
}, {
  property: property$14,
  value: "alternate-normal-reverse",
  valid: false
}, {
  property: property$14,
  value: "normal, normal",
  valid: true
}, {
  property: property$14,
  value: "normal, normal,",
  valid: false
}, {
  property: property$14,
  value: "var(--foo), var(--bar)",
  valid: true
}, {
  property: property$14,
  value: "var(--foo), var(--bar),",
  valid: false
}]);

var property$15 = "animation-fill-mode";
var animationFillMode = [].concat(toConsumableArray(globalTests(property$15)), [{
  property: property$15,
  value: "none",
  valid: true
}, {
  property: property$15,
  value: "forwards",
  valid: true
}, {
  property: property$15,
  value: "backwards",
  valid: true
}, {
  property: property$15,
  value: "both",
  valid: true
}, {
  property: property$15,
  value: "NONE",
  valid: true
}, {
  property: property$15,
  value: "FORWARDS",
  valid: true
}, {
  property: property$15,
  value: "BACKWARDS",
  valid: true
}, {
  property: property$15,
  value: "BOTH",
  valid: true
}, {
  property: property$15,
  value: "forwards-backwards",
  valid: false
}, {
  property: property$15,
  value: "none, none",
  valid: true
}, {
  property: property$15,
  value: "none, none,",
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

var property$16 = "animation-iteration-count";
var animationIterationCount = [].concat(toConsumableArray(globalTests(property$16)), [{
  property: property$16,
  value: "12",
  valid: true
}, {
  property: property$16,
  value: "4.01",
  valid: true
}, {
  property: property$16,
  value: "-456.8",
  valid: true
}, {
  property: property$16,
  value: "0.0",
  valid: true
}, {
  property: property$16,
  value: "+0.0",
  valid: true
}, {
  property: property$16,
  value: "-0.0",
  valid: true
}, {
  property: property$16,
  value: ".60",
  valid: true
}, {
  property: property$16,
  value: "10e3",
  valid: true
}, {
  property: property$16,
  value: "-3.4e-2",
  valid: true
}, {
  property: property$16,
  value: "infinite",
  valid: true
}, {
  property: property$16,
  value: "12.",
  valid: false
}, {
  property: property$16,
  value: "+-12.2",
  valid: false
}, {
  property: property$16,
  value: "12.1.1",
  valid: false
}, {
  property: property$16,
  value: "\"10px\"",
  valid: false
}, {
  property: property$16,
  value: "12, 12",
  valid: true
}, {
  property: property$16,
  value: "12, 12,",
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
  value: "\"foobar\"",
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
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }]));
  return suite;
}, []);

var backfaceVisibility = ["-webkit-backface-visibility", "-moz-backface-visibility", "backface-visibility"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "visible")), [{
    property: property,
    value: "visible visible",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "hidden")), [{
    property: property,
    value: "hidden hidden",
    valid: false
  }]));
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

var backgroundPosition = ["background-position", "mask-position"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "left",
    valid: true
  }, {
    property: property,
    value: "center",
    valid: true
  }, {
    property: property,
    value: "right",
    valid: true
  }, {
    property: property,
    value: "top",
    valid: true
  }, {
    property: property,
    value: "bottom",
    valid: true
  }, {
    property: property,
    value: "10px",
    valid: true
  }, {
    property: property,
    value: "50%",
    valid: true
  }, {
    property: property,
    value: "left top",
    valid: true
  }, {
    property: property,
    value: "left center",
    valid: true
  }, {
    property: property,
    value: "left bottom",
    valid: true
  }, {
    property: property,
    value: "right 50%",
    valid: true
  }, {
    property: property,
    value: "10px top",
    valid: true
  }, {
    property: property,
    value: "50% 50%",
    valid: true
  }, {
    property: property,
    value: "bottom right",
    valid: true
  }, {
    property: property,
    value: "center center",
    valid: true
  }, {
    property: property,
    value: "50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom",
    valid: true
  }, {
    property: property,
    value: "top 50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom 25%",
    valid: true
  }, {
    property: property,
    value: "top 10px right 50px",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz) var(--quux)",
    valid: true
  }, {
    property: property,
    value: "left right",
    valid: false
  }, {
    property: property,
    value: "right left",
    valid: false
  }, {
    property: property,
    value: "top bottom",
    valid: false
  }, {
    property: property,
    value: "bottom top",
    valid: false
  }, {
    property: property,
    value: "left/top",
    valid: false
  }, {
    property: property,
    value: "50% left",
    valid: false
  }, {
    property: property,
    value: "left 50% 50%",
    valid: false
  }, {
    property: property,
    value: "left 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "top 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "center center center center",
    valid: false
  }, {
    property: property,
    value: "left/25%/bottom",
    valid: false
  }, {
    property: property,
    value: "top/10px/right/50px",
    valid: false
  }, {
    property: property,
    value: "left, left",
    valid: true
  }, {
    property: property,
    value: "left, left,",
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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: true
  }, {
    property: property,
    value: "0, 0",
    valid: false
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo), var(--bar)",
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
  }, {
    property: property,
    value: "none none",
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
  }, {
    property: property,
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "thin thin",
    valid: false
  }]));
  return suite;
}, []);

var property$21 = "border-collapse";
var borderCollapse = [].concat(toConsumableArray(globalTests(property$21)), toConsumableArray(createCaseInsensitiveTest(property$21, "collapse")), [{
  property: property$21,
  value: "collapse collapse",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$21, "separate")), [{
  property: property$21,
  value: "separate separate",
  valid: false
}]);

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
}, {
  property: property$22,
  value: "RGB(1, 2, 3) RGB(1, 2, 3)",
  valid: true
}, {
  property: property$22,
  value: "RGB(1, 2, 3), RGB(1, 2, 3)",
  valid: false
}, {
  property: property$22,
  value: "var(--foo) var(--bar)",
  valid: true
}, {
  property: property$22,
  value: "var(--foo), var(--bar)",
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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
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
  }, {
    property: property,
    value: "1% 1%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }]));
  return suite;
}, []);

var property$23 = "box-align";
var boxAlign = [].concat(toConsumableArray(globalTests(property$23)), toConsumableArray(createCaseInsensitiveTest(property$23, "start")), [{
  property: property$23,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$23, "center")), [{
  property: property$23,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$23, "end")), [{
  property: property$23,
  value: "end end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$23, "baseline")), [{
  property: property$23,
  value: "baseline baseline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$23, "stretch")), [{
  property: property$23,
  value: "stretch stretch",
  valid: false
}]);

var boxDecorationBreak = ["-webkit-box-decoration-break", "box-decoration-break"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "slice")), [{
    property: property,
    value: "slice slice",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "clone")), [{
    property: property,
    value: "clone clone",
    valid: false
  }]));
  return suite;
}, []);

var property$24 = "box-direction";
var boxDirection = [].concat(toConsumableArray(globalTests(property$24)), toConsumableArray(createCaseInsensitiveTest(property$24, "normal")), [{
  property: property$24,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$24, "reverse")), [{
  property: property$24,
  value: "reverse reverse",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$24, "inherit")), [{
  property: property$24,
  value: "inherit inherit",
  valid: false
}]);

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
  }, {
    property: property,
    value: "\"10px\"",
    valid: false
  }, {
    property: property,
    value: "12 12",
    valid: false
  }]));
  return suite;
}, []);

var property$25 = "box-lines";
var boxLines = [].concat(toConsumableArray(globalTests(property$25)), toConsumableArray(createCaseInsensitiveTest(property$25, "single")), [{
  property: property$25,
  value: "single single",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$25, "multiple")), [{
  property: property$25,
  value: "multiple multiple",
  valid: false
}]);

var property$26 = "box-orient";
var boxOrient = [].concat(toConsumableArray(globalTests(property$26)), toConsumableArray(createCaseInsensitiveTest(property$26, "horizontal")), [{
  property: property$26,
  value: "horizontal horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$26, "vertical")), [{
  property: property$26,
  value: "vertical vertical",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$26, "inline-axis")), [{
  property: property$26,
  value: "inline-axis inline-axis",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$26, "block-axis")), [{
  property: property$26,
  value: "block-axis block-axis",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$26, "inherit")), [{
  property: property$26,
  value: "inherit inherit",
  valid: false
}]);

var property$27 = "box-pack";
var boxPack = [].concat(toConsumableArray(globalTests(property$27)), toConsumableArray(createCaseInsensitiveTest(property$27, "start")), [{
  property: property$27,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$27, "center")), [{
  property: property$27,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$27, "end")), [{
  property: property$27,
  value: "end end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$27, "justify")), [{
  property: property$27,
  value: "justify justify",
  valid: false
}]);

var boxSizing = ["-webkit-box-sizing", "-moz-box-sizing", "box-sizing"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "content-box")), [{
    property: property,
    value: "content-box content-box",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "border-box")), [{
    property: property,
    value: "border-box border-box",
    valid: false
  }]));
  return suite;
}, []);

var property$28 = "box-suppress";
var boxSuppress = [].concat(toConsumableArray(globalTests(property$28)), toConsumableArray(createCaseInsensitiveTest(property$28, "show")), [{
  property: property$28,
  value: "show show",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$28, "discard")), [{
  property: property$28,
  value: "discard discard",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$28, "hide")), [{
  property: property$28,
  value: "hide hide",
  valid: false
}]);

var pageBreakAfter = ["page-break-after", "page-break-before"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "always")), [{
    property: property,
    value: "always always",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "avoid")), [{
    property: property,
    value: "avoid avoid",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "left")), [{
    property: property,
    value: "left left",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "right")), [{
    property: property,
    value: "right right",
    valid: false
  }]));
  return suite;
}, []);

var webkitColumnBreakInside = ["-webkit-column-break-inside", "page-break-inside", "break-inside"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "avoid")), [{
    property: property,
    value: "avoid avoid",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "avoid-page")), [{
    property: property,
    value: "avoid-page avoid-page",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "avoid-column")), [{
    property: property,
    value: "avoid-column avoid-column",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "avoid-region")), [{
    property: property,
    value: "avoid-region avoid-region",
    valid: false
  }]));
  return suite;
}, []);

var property$29 = "caption-side";
var captionSide = [].concat(toConsumableArray(globalTests(property$29)), toConsumableArray(createCaseInsensitiveTest(property$29, "top")), [{
  property: property$29,
  value: "top top",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$29, "bottom")), [{
  property: property$29,
  value: "bottom bottom",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$29, "block-start")), [{
  property: property$29,
  value: "block-start block-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$29, "block-end")), [{
  property: property$29,
  value: "block-end block-end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$29, "inline-start")), [{
  property: property$29,
  value: "inline-start inline-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$29, "inline-end")), [{
  property: property$29,
  value: "inline-end inline-end",
  valid: false
}]);

var property$30 = "clear";
var clear = [].concat(toConsumableArray(globalTests(property$30)), toConsumableArray(createCaseInsensitiveTest(property$30, "none")), [{
  property: property$30,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$30, "left")), [{
  property: property$30,
  value: "left left",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$30, "right")), [{
  property: property$30,
  value: "right right",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$30, "both")), [{
  property: property$30,
  value: "both both",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$30, "inline-start")), [{
  property: property$30,
  value: "inline-start inline-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$30, "inline-end")), [{
  property: property$30,
  value: "inline-end inline-end",
  valid: false
}]);

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
  }, {
    property: property,
    value: "\"10px\"",
    valid: false
  }, {
    property: property,
    value: "12 12",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }]));
  return suite;
}, []);

var columnFill = ["-webkit-column-fill", "-moz-column-fill", "column-fill"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "balance")), [{
    property: property,
    value: "balance balance",
    valid: false
  }]));
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
  }, {
    property: property,
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "normal normal",
    valid: false
  }]));
  return suite;
}, []);

var columnSpan = ["-webkit-column-span", "-moz-column-span", "column-span"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "all")), [{
    property: property,
    value: "all all",
    valid: false
  }]));
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
  }, {
    property: property,
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }]));
  return suite;
}, []);

var property$31 = "direction";
var direction = [].concat(toConsumableArray(globalTests(property$31)), toConsumableArray(createCaseInsensitiveTest(property$31, "ltr")), [{
  property: property$31,
  value: "ltr ltr",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$31, "rtl")), [{
  property: property$31,
  value: "rtl rtl",
  valid: false
}]);

var property$32 = "display";
var display = [].concat(toConsumableArray(globalTests(property$32)), toConsumableArray(createCaseInsensitiveTest(property$32, "none")), [{
  property: property$32,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline")), [{
  property: property$32,
  value: "inline inline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "block")), [{
  property: property$32,
  value: "block block",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "list-item")), [{
  property: property$32,
  value: "list-item list-item",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline-list-item")), [{
  property: property$32,
  value: "inline-list-item inline-list-item",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline-block")), [{
  property: property$32,
  value: "inline-block inline-block",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline-table")), [{
  property: property$32,
  value: "inline-table inline-table",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table")), [{
  property: property$32,
  value: "table table",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-cell")), [{
  property: property$32,
  value: "table-cell table-cell",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-column")), [{
  property: property$32,
  value: "table-column table-column",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-column-group")), [{
  property: property$32,
  value: "table-column-group table-column-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-footer-group")), [{
  property: property$32,
  value: "table-footer-group table-footer-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-header-group")), [{
  property: property$32,
  value: "table-header-group table-header-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-row")), [{
  property: property$32,
  value: "table-row table-row",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "table-row-group")), [{
  property: property$32,
  value: "table-row-group table-row-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "flex")), [{
  property: property$32,
  value: "flex flex",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline-flex")), [{
  property: property$32,
  value: "inline-flex inline-flex",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "grid")), [{
  property: property$32,
  value: "grid grid",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "inline-grid")), [{
  property: property$32,
  value: "inline-grid inline-grid",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "run-in")), [{
  property: property$32,
  value: "run-in run-in",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "ruby")), [{
  property: property$32,
  value: "ruby ruby",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-base")), [{
  property: property$32,
  value: "ruby-base ruby-base",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-text")), [{
  property: property$32,
  value: "ruby-text ruby-text",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-base-container")), [{
  property: property$32,
  value: "ruby-base-container ruby-base-container",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "ruby-text-container")), [{
  property: property$32,
  value: "ruby-text-container ruby-text-container",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "contents")), [{
  property: property$32,
  value: "contents contents",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-box")), [{
  property: property$32,
  value: "-webkit-box -webkit-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-flex")), [{
  property: property$32,
  value: "-webkit-flex -webkit-flex",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-moz-box")), [{
  property: property$32,
  value: "-moz-box -moz-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-flexbox")), [{
  property: property$32,
  value: "-ms-flexbox -ms-flexbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-inline-box")), [{
  property: property$32,
  value: "-webkit-inline-box -webkit-inline-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-webkit-inline-flex")), [{
  property: property$32,
  value: "-webkit-inline-flex -webkit-inline-flex",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-moz-inline-box")), [{
  property: property$32,
  value: "-moz-inline-box -moz-inline-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-inline-flexbox")), [{
  property: property$32,
  value: "-ms-inline-flexbox -ms-inline-flexbox",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-grid")), [{
  property: property$32,
  value: "-ms-grid -ms-grid",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$32, "-ms-inline-grid")), [{
  property: property$32,
  value: "-ms-inline-grid -ms-inline-grid",
  valid: false
}]);

var property$33 = "display-inside";
var displayInside = [].concat(toConsumableArray(globalTests(property$33)), toConsumableArray(createCaseInsensitiveTest(property$33, "auto")), [{
  property: property$33,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$33, "block")), [{
  property: property$33,
  value: "block block",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$33, "table")), [{
  property: property$33,
  value: "table table",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$33, "flex")), [{
  property: property$33,
  value: "flex flex",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$33, "grid")), [{
  property: property$33,
  value: "grid grid",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$33, "ruby")), [{
  property: property$33,
  value: "ruby ruby",
  valid: false
}]);

var property$34 = "display-list";
var displayList = [].concat(toConsumableArray(globalTests(property$34)), toConsumableArray(createCaseInsensitiveTest(property$34, "none")), [{
  property: property$34,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$34, "list-item")), [{
  property: property$34,
  value: "list-item list-item",
  valid: false
}]);

var property$35 = "display-outside";
var displayOutside = [].concat(toConsumableArray(globalTests(property$35)), toConsumableArray(createCaseInsensitiveTest(property$35, "block-level")), [{
  property: property$35,
  value: "block-level block-level",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "inline-level")), [{
  property: property$35,
  value: "inline-level inline-level",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "run-in")), [{
  property: property$35,
  value: "run-in run-in",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "contents")), [{
  property: property$35,
  value: "contents contents",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "none")), [{
  property: property$35,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-row-group")), [{
  property: property$35,
  value: "table-row-group table-row-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-header-group")), [{
  property: property$35,
  value: "table-header-group table-header-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-footer-group")), [{
  property: property$35,
  value: "table-footer-group table-footer-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-row")), [{
  property: property$35,
  value: "table-row table-row",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-cell")), [{
  property: property$35,
  value: "table-cell table-cell",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-column-group")), [{
  property: property$35,
  value: "table-column-group table-column-group",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-column")), [{
  property: property$35,
  value: "table-column table-column",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "table-caption")), [{
  property: property$35,
  value: "table-caption table-caption",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-base")), [{
  property: property$35,
  value: "ruby-base ruby-base",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-text")), [{
  property: property$35,
  value: "ruby-text ruby-text",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-base-container")), [{
  property: property$35,
  value: "ruby-base-container ruby-base-container",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$35, "ruby-text-container")), [{
  property: property$35,
  value: "ruby-text-container ruby-text-container",
  valid: false
}]);

var property$36 = "empty-cells";
var emptyCells = [].concat(toConsumableArray(globalTests(property$36)), toConsumableArray(createCaseInsensitiveTest(property$36, "show")), [{
  property: property$36,
  value: "show show",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$36, "hide")), [{
  property: property$36,
  value: "hide hide",
  valid: false
}]);

var mozBoxOrient = ["-webkit-box-orient", "-moz-box-orient"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), [{
    property: property,
    value: "row row",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), [{
    property: property,
    value: "row-reverse row-reverse",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column")), [{
    property: property,
    value: "column column",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column-reverse")), [{
    property: property,
    value: "column-reverse column-reverse",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "horizontal")), [{
    property: property,
    value: "horizontal horizontal",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "vertical")), [{
    property: property,
    value: "vertical vertical",
    valid: false
  }]));
  return suite;
}, []);

var mozBoxDirection = ["-webkit-box-direction", "-moz-box-direction"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), [{
    property: property,
    value: "row row",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), [{
    property: property,
    value: "row-reverse row-reverse",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column")), [{
    property: property,
    value: "column column",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column-reverse")), [{
    property: property,
    value: "column-reverse column-reverse",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "normal normal",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "reverse")), [{
    property: property,
    value: "reverse reverse",
    valid: false
  }]));
  return suite;
}, []);

var flexDirection = ["-webkit-flex-direction", "-ms-flex-direction", "flex-direction"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "row")), [{
    property: property,
    value: "row row",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "row-reverse")), [{
    property: property,
    value: "row-reverse row-reverse",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column")), [{
    property: property,
    value: "column column",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "column-reverse")), [{
    property: property,
    value: "column-reverse column-reverse",
    valid: false
  }]));
  return suite;
}, []);

var flexWrap = ["-webkit-flex-wrap", "-ms-flex-wrap", "flex-wrap"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "nowrap")), [{
    property: property,
    value: "nowrap nowrap",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "wrap")), [{
    property: property,
    value: "wrap wrap",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "wrap-reverse")), [{
    property: property,
    value: "wrap-reverse wrap-reverse",
    valid: false
  }]));
  return suite;
}, []);

var property$37 = "float";
var float = [].concat(toConsumableArray(globalTests(property$37)), toConsumableArray(createCaseInsensitiveTest(property$37, "left")), [{
  property: property$37,
  value: "left left",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$37, "right")), [{
  property: property$37,
  value: "right right",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$37, "none")), [{
  property: property$37,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$37, "inline-start")), [{
  property: property$37,
  value: "inline-start inline-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$37, "inline-end")), [{
  property: property$37,
  value: "inline-end inline-end",
  valid: false
}]);

var fontKerning = ["-webkit-font-kerning", "-moz-font-kerning", "font-kerning"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "normal normal",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }]));
  return suite;
}, []);

var fontLanguageOverride = ["-webkit-font-language-override", "-moz-font-language-override", "font-language-override"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "normal normal",
    valid: false
  }, {
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
  }, {
    property: property,
    value: "\"foo\" \"foo\"",
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
  value: "xx-small xx-small",
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
  value: "larger larger",
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
  value: "\"1rem\"",
  valid: false
}, {
  property: property$38,
  value: "12.%",
  valid: false
}, {
  property: property$38,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}, {
  property: property$38,
  value: "0 0",
  valid: false
}]);

var property$39 = "font-size-adjust";
var fontSizeAdjust = [].concat(toConsumableArray(globalTests(property$39)), toConsumableArray(createCaseInsensitiveTest(property$39, "none")), [{
  property: property$39,
  value: "none none",
  valid: false
}, {
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
}, {
  property: property$39,
  value: "\"10px\"",
  valid: false
}, {
  property: property$39,
  value: "12 12",
  valid: false
}]);

var property$40 = "font-stretch";
var fontStretch = [].concat(toConsumableArray(globalTests(property$40)), toConsumableArray(createCaseInsensitiveTest(property$40, "normal")), [{
  property: property$40,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "ultra-condensed")), [{
  property: property$40,
  value: "ultra-condensed ultra-condensed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "extra-condensed")), [{
  property: property$40,
  value: "extra-condensed extra-condensed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "condensed")), [{
  property: property$40,
  value: "condensed condensed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "semi-condensed")), [{
  property: property$40,
  value: "semi-condensed semi-condensed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "semi-expanded")), [{
  property: property$40,
  value: "semi-expanded semi-expanded",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "expanded")), [{
  property: property$40,
  value: "expanded expanded",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "extra-expanded")), [{
  property: property$40,
  value: "extra-expanded extra-expanded",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$40, "ultra-expanded")), [{
  property: property$40,
  value: "ultra-expanded ultra-expanded",
  valid: false
}]);

var property$41 = "font-style";
var fontStyle = [].concat(toConsumableArray(globalTests(property$41)), toConsumableArray(createCaseInsensitiveTest(property$41, "normal")), [{
  property: property$41,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$41, "italic")), [{
  property: property$41,
  value: "italic italic",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$41, "oblique")), [{
  property: property$41,
  value: "oblique oblique",
  valid: false
}]);

var property$42 = "font-variant-caps";
var fontVariantCaps = [].concat(toConsumableArray(globalTests(property$42)), toConsumableArray(createCaseInsensitiveTest(property$42, "normal")), [{
  property: property$42,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "small-caps")), [{
  property: property$42,
  value: "small-caps small-caps",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "all-small-caps")), [{
  property: property$42,
  value: "all-small-caps all-small-caps",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "petite-caps")), [{
  property: property$42,
  value: "petite-caps petite-caps",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "all-petite-caps")), [{
  property: property$42,
  value: "all-petite-caps all-petite-caps",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "unicase")), [{
  property: property$42,
  value: "unicase unicase",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$42, "titling-caps")), [{
  property: property$42,
  value: "titling-caps titling-caps",
  valid: false
}]);

var property$43 = "font-variant-position";
var fontVariantPosition = [].concat(toConsumableArray(globalTests(property$43)), toConsumableArray(createCaseInsensitiveTest(property$43, "normal")), [{
  property: property$43,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$43, "sub")), [{
  property: property$43,
  value: "sub sub",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$43, "super")), [{
  property: property$43,
  value: "super super",
  valid: false
}]);

var property$44 = "font-weight";
var fontWeight = [].concat(toConsumableArray(globalTests(property$44)), toConsumableArray(createCaseInsensitiveTest(property$44, "normal")), [{
  property: property$44,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "bold")), [{
  property: property$44,
  value: "bold bold",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "bolder")), [{
  property: property$44,
  value: "bolder bolder",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "lighter")), [{
  property: property$44,
  value: "lighter lighter",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "100")), [{
  property: property$44,
  value: "100 100",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "200")), [{
  property: property$44,
  value: "200 200",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "300")), [{
  property: property$44,
  value: "300 300",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "400")), [{
  property: property$44,
  value: "400 400",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "500")), [{
  property: property$44,
  value: "500 500",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "600")), [{
  property: property$44,
  value: "600 600",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "700")), [{
  property: property$44,
  value: "700 700",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "800")), [{
  property: property$44,
  value: "800 800",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$44, "900")), [{
  property: property$44,
  value: "900 900",
  valid: false
}]);

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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "12.%",
    valid: false
  }, {
    property: property,
    value: "42.2.3.4.7.8.1.2%",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: false
  }]));
  return suite;
}, []);

var property$45 = "grid-template-areas";
var gridTemplateAreas = [].concat(toConsumableArray(globalTests(property$45)), toConsumableArray(createCaseInsensitiveTest(property$45, "none")), [{
  property: property$45,
  value: "none none",
  valid: false
}, {
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
}, {
  property: property$45,
  value: "\"foo\" \"foo\"",
  valid: true
}, {
  property: property$45,
  value: "\"foo\", \"foo\"",
  valid: false
}, {
  property: property$45,
  value: "var(--foo) var(--bar)",
  valid: true
}, {
  property: property$45,
  value: "var(--foo), var(--bar)",
  valid: false
}]);

var hyphens = ["-webkit-hyphens", "-moz-hyphens", "-ms-hyphens", "hyphens"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "manual")), [{
    property: property,
    value: "manual manual",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }]));
  return suite;
}, []);

var property$46 = "image-rendering";
var imageRendering = [].concat(toConsumableArray(globalTests(property$46)), toConsumableArray(createCaseInsensitiveTest(property$46, "auto")), [{
  property: property$46,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$46, "crisp-edges")), [{
  property: property$46,
  value: "crisp-edges crisp-edges",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$46, "pixelated")), [{
  property: property$46,
  value: "pixelated pixelated",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$46, "-moz-crisp-edges")), [{
  property: property$46,
  value: "-moz-crisp-edges -moz-crisp-edges",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$46, "-o-pixelated")), [{
  property: property$46,
  value: "-o-pixelated -o-pixelated",
  valid: false
}]);

var property$47 = "-ms-interpolation-mode";
var msInterpolationMode = [].concat(toConsumableArray(globalTests(property$47)), toConsumableArray(createCaseInsensitiveTest(property$47, "auto")), [{
  property: property$47,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$47, "crisp-edges")), [{
  property: property$47,
  value: "crisp-edges crisp-edges",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$47, "pixelated")), [{
  property: property$47,
  value: "pixelated pixelated",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$47, "nearest-neighbor")), [{
  property: property$47,
  value: "nearest-neighbor nearest-neighbor",
  valid: false
}]);

var property$48 = "ime-mode";
var imeMode = [].concat(toConsumableArray(globalTests(property$48)), toConsumableArray(createCaseInsensitiveTest(property$48, "auto")), [{
  property: property$48,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$48, "normal")), [{
  property: property$48,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$48, "active")), [{
  property: property$48,
  value: "active active",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$48, "inactive")), [{
  property: property$48,
  value: "inactive inactive",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$48, "disabled")), [{
  property: property$48,
  value: "disabled disabled",
  valid: false
}]);

var property$49 = "initial-letter-align";
var initialLetterAlign = [].concat(toConsumableArray(globalTests(property$49)), toConsumableArray(createCaseInsensitiveTest(property$49, "auto")), [{
  property: property$49,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$49, "alphabetic")), [{
  property: property$49,
  value: "alphabetic alphabetic",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$49, "hanging")), [{
  property: property$49,
  value: "hanging hanging",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$49, "ideographic")), [{
  property: property$49,
  value: "ideographic ideographic",
  valid: false
}]);

var property$50 = "isolation";
var isolation = [].concat(toConsumableArray(globalTests(property$50)), toConsumableArray(createCaseInsensitiveTest(property$50, "auto")), [{
  property: property$50,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$50, "isolate")), [{
  property: property$50,
  value: "isolate isolate",
  valid: false
}]);

var mozBoxPack = ["-webkit-box-pack", "-moz-box-pack"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-between")), [{
    property: property,
    value: "space-between space-between",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-around")), [{
    property: property,
    value: "space-around space-around",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "start")), [{
    property: property,
    value: "start start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "end")), [{
    property: property,
    value: "end end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "justify")), [{
    property: property,
    value: "justify justify",
    valid: false
  }]));
  return suite;
}, []);

var justifyContent = ["-webkit-justify-content", "justify-content"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flex-start")), [{
    property: property,
    value: "flex-start flex-start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "flex-end")), [{
    property: property,
    value: "flex-end flex-end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-between")), [{
    property: property,
    value: "space-between space-between",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "space-around")), [{
    property: property,
    value: "space-around space-around",
    valid: false
  }]));
  return suite;
}, []);

var property$51 = "-ms-flex-pack";
var msFlexPack = [].concat(toConsumableArray(globalTests(property$51)), toConsumableArray(createCaseInsensitiveTest(property$51, "flex-start")), [{
  property: property$51,
  value: "flex-start flex-start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "flex-end")), [{
  property: property$51,
  value: "flex-end flex-end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "center")), [{
  property: property$51,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "space-between")), [{
  property: property$51,
  value: "space-between space-between",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "space-around")), [{
  property: property$51,
  value: "space-around space-around",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "start")), [{
  property: property$51,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "end")), [{
  property: property$51,
  value: "end end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "justify")), [{
  property: property$51,
  value: "justify justify",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$51, "distribute")), [{
  property: property$51,
  value: "distribute distribute",
  valid: false
}]);

var property$52 = "letter-spacing";
var letterSpacing = [].concat(toConsumableArray(globalTests(property$52)), toConsumableArray(createCaseInsensitiveTest(property$52, "normal")), [{
  property: property$52,
  value: "normal normal",
  valid: false
}, {
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
}, {
  property: property$52,
  value: "\"1rem\"",
  valid: false
}, {
  property: property$52,
  value: "0 0",
  valid: false
}]);

var property$53 = "line-break";
var lineBreak = [].concat(toConsumableArray(globalTests(property$53)), toConsumableArray(createCaseInsensitiveTest(property$53, "auto")), [{
  property: property$53,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$53, "loose")), [{
  property: property$53,
  value: "loose loose",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$53, "normal")), [{
  property: property$53,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$53, "strict")), [{
  property: property$53,
  value: "strict strict",
  valid: false
}]);

var property$54 = "line-height";
var lineHeight = [].concat(toConsumableArray(globalTests(property$54)), toConsumableArray(createCaseInsensitiveTest(property$54, "normal")), [{
  property: property$54,
  value: "normal normal",
  valid: false
}, {
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
  value: "\"10px\"",
  valid: false
}, {
  property: property$54,
  value: "12 12",
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
  value: "\"1rem\"",
  valid: false
}, {
  property: property$54,
  value: "0 0",
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
}, {
  property: property$54,
  value: "1% 1%",
  valid: false
}]);

var property$55 = "list-style-position";
var listStylePosition = [].concat(toConsumableArray(globalTests(property$55)), toConsumableArray(createCaseInsensitiveTest(property$55, "inside")), [{
  property: property$55,
  value: "inside inside",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$55, "outside")), [{
  property: property$55,
  value: "outside outside",
  valid: false
}]);

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
var maskType = [].concat(toConsumableArray(globalTests(property$58)), toConsumableArray(createCaseInsensitiveTest(property$58, "luminance")), [{
  property: property$58,
  value: "luminance luminance",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$58, "alpha")), [{
  property: property$58,
  value: "alpha alpha",
  valid: false
}]);

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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
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
  }, {
    property: property,
    value: "1% 1%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "max-content")), [{
    property: property,
    value: "max-content max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "min-content")), [{
    property: property,
    value: "min-content min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "fit-content")), [{
    property: property,
    value: "fit-content fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "fill-available")), [{
    property: property,
    value: "fill-available fill-available",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-max-content")), [{
    property: property,
    value: "-webkit-max-content -webkit-max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-max-content")), [{
    property: property,
    value: "-moz-max-content -moz-max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-min-content")), [{
    property: property,
    value: "-webkit-min-content -webkit-min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-min-content")), [{
    property: property,
    value: "-moz-min-content -moz-min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fit-content")), [{
    property: property,
    value: "-webkit-fit-content -webkit-fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-fit-content")), [{
    property: property,
    value: "-moz-fit-content -moz-fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fill-available")), [{
    property: property,
    value: "-webkit-fill-available -webkit-fill-available",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-available")), [{
    property: property,
    value: "-moz-available -moz-available",
    valid: false
  }]));
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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
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
  }, {
    property: property,
    value: "1% 1%",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "max-content")), [{
    property: property,
    value: "max-content max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "min-content")), [{
    property: property,
    value: "min-content min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "fit-content")), [{
    property: property,
    value: "fit-content fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "fill-available")), [{
    property: property,
    value: "fill-available fill-available",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-max-content")), [{
    property: property,
    value: "-webkit-max-content -webkit-max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-max-content")), [{
    property: property,
    value: "-moz-max-content -moz-max-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-min-content")), [{
    property: property,
    value: "-webkit-min-content -webkit-min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-min-content")), [{
    property: property,
    value: "-moz-min-content -moz-min-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fit-content")), [{
    property: property,
    value: "-webkit-fit-content -webkit-fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-fit-content")), [{
    property: property,
    value: "-moz-fit-content -moz-fit-content",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-webkit-fill-available")), [{
    property: property,
    value: "-webkit-fill-available -webkit-fill-available",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "-moz-available")), [{
    property: property,
    value: "-moz-available -moz-available",
    valid: false
  }]));
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
}, {
  property: property$59,
  value: "normal normal",
  valid: false
}]);

var objectFit = ["-o-object-fit", "object-fit"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "fill")), [{
    property: property,
    value: "fill fill",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "contain")), [{
    property: property,
    value: "contain contain",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "cover")), [{
    property: property,
    value: "cover cover",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "scale-down")), [{
    property: property,
    value: "scale-down scale-down",
    valid: false
  }]));
  return suite;
}, []);

var objectPosition = ["object-position", "perspective-origin", "scroll-snap-destination"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat([{
    property: property,
    value: "left",
    valid: true
  }, {
    property: property,
    value: "center",
    valid: true
  }, {
    property: property,
    value: "right",
    valid: true
  }, {
    property: property,
    value: "top",
    valid: true
  }, {
    property: property,
    value: "bottom",
    valid: true
  }, {
    property: property,
    value: "10px",
    valid: true
  }, {
    property: property,
    value: "50%",
    valid: true
  }, {
    property: property,
    value: "left top",
    valid: true
  }, {
    property: property,
    value: "left center",
    valid: true
  }, {
    property: property,
    value: "left bottom",
    valid: true
  }, {
    property: property,
    value: "right 50%",
    valid: true
  }, {
    property: property,
    value: "10px top",
    valid: true
  }, {
    property: property,
    value: "50% 50%",
    valid: true
  }, {
    property: property,
    value: "bottom right",
    valid: true
  }, {
    property: property,
    value: "center center",
    valid: true
  }, {
    property: property,
    value: "50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom",
    valid: true
  }, {
    property: property,
    value: "top 50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom 25%",
    valid: true
  }, {
    property: property,
    value: "top 10px right 50px",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz) var(--quux)",
    valid: true
  }, {
    property: property,
    value: "left right",
    valid: false
  }, {
    property: property,
    value: "right left",
    valid: false
  }, {
    property: property,
    value: "top bottom",
    valid: false
  }, {
    property: property,
    value: "bottom top",
    valid: false
  }, {
    property: property,
    value: "left/top",
    valid: false
  }, {
    property: property,
    value: "50% left",
    valid: false
  }, {
    property: property,
    value: "left 50% 50%",
    valid: false
  }, {
    property: property,
    value: "left 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "top 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "center center center center",
    valid: false
  }, {
    property: property,
    value: "left/25%/bottom",
    valid: false
  }, {
    property: property,
    value: "top/10px/right/50px",
    valid: false
  }, {
    property: property,
    value: "left left",
    valid: false
  }]));
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
}, {
  property: property$60,
  value: "RGB(1, 2, 3) RGB(1, 2, 3)",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$60, "invert")), [{
  property: property$60,
  value: "invert invert",
  valid: false
}]);

var property$61 = "outline-style";
var outlineStyle = [].concat(toConsumableArray(globalTests(property$61)), toConsumableArray(createCaseInsensitiveTest(property$61, "auto")), [{
  property: property$61,
  value: "auto auto",
  valid: false
}, {
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
}, {
  property: property$61,
  value: "none none",
  valid: false
}]);

var overflow = ["overflow", "overflow-x", "overflow-y"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "visible")), [{
    property: property,
    value: "visible visible",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "hidden")), [{
    property: property,
    value: "hidden hidden",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "scroll")), [{
    property: property,
    value: "scroll scroll",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }]));
  return suite;
}, []);

var property$62 = "overflow-clip-box";
var overflowClipBox = [].concat(toConsumableArray(globalTests(property$62)), toConsumableArray(createCaseInsensitiveTest(property$62, "padding-box")), [{
  property: property$62,
  value: "padding-box padding-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$62, "content-box")), [{
  property: property$62,
  value: "content-box content-box",
  valid: false
}]);

var overflowWrap = ["overflow-wrap", "word-wrap"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "normal")), [{
    property: property,
    value: "normal normal",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "break-word")), [{
    property: property,
    value: "break-word break-word",
    valid: false
  }]));
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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
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
  }, {
    property: property,
    value: "1% 1%",
    valid: false
  }]));
  return suite;
}, []);

var property$63 = "page-break-inside";
var pageBreakInside = [].concat(toConsumableArray(globalTests(property$63)), toConsumableArray(createCaseInsensitiveTest(property$63, "auto")), [{
  property: property$63,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$63, "avoid")), [{
  property: property$63,
  value: "avoid avoid",
  valid: false
}]);

var perspective = ["-webkit-perspective", "-moz-perspective", "perspective"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
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
    value: "\"1rem\"",
    valid: false
  }, {
    property: property,
    value: "0 0",
    valid: false
  }]));
  return suite;
}, []);

var property$64 = "pointer-events";
var pointerEvents = [].concat(toConsumableArray(globalTests(property$64)), toConsumableArray(createCaseInsensitiveTest(property$64, "auto")), [{
  property: property$64,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "none")), [{
  property: property$64,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "visiblePainted")), [{
  property: property$64,
  value: "visiblePainted visiblePainted",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "visibleFill")), [{
  property: property$64,
  value: "visibleFill visibleFill",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "visibleStroke")), [{
  property: property$64,
  value: "visibleStroke visibleStroke",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "visible")), [{
  property: property$64,
  value: "visible visible",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "painted")), [{
  property: property$64,
  value: "painted painted",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "fill")), [{
  property: property$64,
  value: "fill fill",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "stroke")), [{
  property: property$64,
  value: "stroke stroke",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "all")), [{
  property: property$64,
  value: "all all",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$64, "inherit")), [{
  property: property$64,
  value: "inherit inherit",
  valid: false
}]);

var property$65 = "position";
var position = [].concat(toConsumableArray(globalTests(property$65)), toConsumableArray(createCaseInsensitiveTest(property$65, "static")), [{
  property: property$65,
  value: "static static",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$65, "relative")), [{
  property: property$65,
  value: "relative relative",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$65, "absolute")), [{
  property: property$65,
  value: "absolute absolute",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$65, "sticky")), [{
  property: property$65,
  value: "sticky sticky",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$65, "fixed")), [{
  property: property$65,
  value: "fixed fixed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$65, "-webkit-sticky")), [{
  property: property$65,
  value: "-webkit-sticky -webkit-sticky",
  valid: false
}]);

var property$66 = "resize";
var resize = [].concat(toConsumableArray(globalTests(property$66)), toConsumableArray(createCaseInsensitiveTest(property$66, "none")), [{
  property: property$66,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$66, "both")), [{
  property: property$66,
  value: "both both",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$66, "horizontal")), [{
  property: property$66,
  value: "horizontal horizontal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$66, "vertical")), [{
  property: property$66,
  value: "vertical vertical",
  valid: false
}]);

var property$67 = "ruby-align";
var rubyAlign = [].concat(toConsumableArray(globalTests(property$67)), toConsumableArray(createCaseInsensitiveTest(property$67, "start")), [{
  property: property$67,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$67, "center")), [{
  property: property$67,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$67, "space-between")), [{
  property: property$67,
  value: "space-between space-between",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$67, "space-around")), [{
  property: property$67,
  value: "space-around space-around",
  valid: false
}]);

var property$68 = "ruby-merge";
var rubyMerge = [].concat(toConsumableArray(globalTests(property$68)), toConsumableArray(createCaseInsensitiveTest(property$68, "separate")), [{
  property: property$68,
  value: "separate separate",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$68, "collapse")), [{
  property: property$68,
  value: "collapse collapse",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$68, "auto")), [{
  property: property$68,
  value: "auto auto",
  valid: false
}]);

var property$69 = "ruby-position";
var rubyPosition = [].concat(toConsumableArray(globalTests(property$69)), toConsumableArray(createCaseInsensitiveTest(property$69, "over")), [{
  property: property$69,
  value: "over over",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$69, "under")), [{
  property: property$69,
  value: "under under",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$69, "inter-character")), [{
  property: property$69,
  value: "inter-character inter-character",
  valid: false
}]);

var property$70 = "scroll-behavior";
var scrollBehavior = [].concat(toConsumableArray(globalTests(property$70)), toConsumableArray(createCaseInsensitiveTest(property$70, "auto")), [{
  property: property$70,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$70, "smooth")), [{
  property: property$70,
  value: "smooth smooth",
  valid: false
}]);

var scrollSnapCoordinate = ["-webkit-scroll-snap-coordinate", "-ms-scroll-snap-coordinate", "scroll-snap-coordinate"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }, {
    property: property,
    value: "left",
    valid: true
  }, {
    property: property,
    value: "center",
    valid: true
  }, {
    property: property,
    value: "right",
    valid: true
  }, {
    property: property,
    value: "top",
    valid: true
  }, {
    property: property,
    value: "bottom",
    valid: true
  }, {
    property: property,
    value: "10px",
    valid: true
  }, {
    property: property,
    value: "50%",
    valid: true
  }, {
    property: property,
    value: "left top",
    valid: true
  }, {
    property: property,
    value: "left center",
    valid: true
  }, {
    property: property,
    value: "left bottom",
    valid: true
  }, {
    property: property,
    value: "right 50%",
    valid: true
  }, {
    property: property,
    value: "10px top",
    valid: true
  }, {
    property: property,
    value: "50% 50%",
    valid: true
  }, {
    property: property,
    value: "bottom right",
    valid: true
  }, {
    property: property,
    value: "center center",
    valid: true
  }, {
    property: property,
    value: "50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom",
    valid: true
  }, {
    property: property,
    value: "top 50% center",
    valid: true
  }, {
    property: property,
    value: "left 25% bottom 25%",
    valid: true
  }, {
    property: property,
    value: "top 10px right 50px",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz)",
    valid: true
  }, {
    property: property,
    value: "var(--foo) var(--bar) var(--baz) var(--quux)",
    valid: true
  }, {
    property: property,
    value: "left right",
    valid: false
  }, {
    property: property,
    value: "right left",
    valid: false
  }, {
    property: property,
    value: "top bottom",
    valid: false
  }, {
    property: property,
    value: "bottom top",
    valid: false
  }, {
    property: property,
    value: "left/top",
    valid: false
  }, {
    property: property,
    value: "50% left",
    valid: false
  }, {
    property: property,
    value: "left 50% 50%",
    valid: false
  }, {
    property: property,
    value: "left 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "top 75% center 75%",
    valid: false
  }, {
    property: property,
    value: "center center center center",
    valid: false
  }, {
    property: property,
    value: "left/25%/bottom",
    valid: false
  }, {
    property: property,
    value: "top/10px/right/50px",
    valid: false
  }, {
    property: property,
    value: "left, left",
    valid: true
  }, {
    property: property,
    value: "left, left,",
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

var scrollSnapType = ["-webkit-scroll-snap-type", "-ms-scroll-snap-type", "scroll-snap-type", "scroll-snap-type-x", "scroll-snap-type-y"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "mandatory")), [{
    property: property,
    value: "mandatory mandatory",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "proximity")), [{
    property: property,
    value: "proximity proximity",
    valid: false
  }]));
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
  value: "\"100\"",
  valid: false
}, {
  property: property$71,
  value: "10 10",
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
}, {
  property: property$71,
  value: "\"1rem\"",
  valid: false
}, {
  property: property$71,
  value: "0 0",
  valid: false
}]);

var property$72 = "table-layout";
var tableLayout = [].concat(toConsumableArray(globalTests(property$72)), toConsumableArray(createCaseInsensitiveTest(property$72, "auto")), [{
  property: property$72,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$72, "fixed")), [{
  property: property$72,
  value: "fixed fixed",
  valid: false
}]);

var property$73 = "text-align";
var textAlign = [].concat(toConsumableArray(globalTests(property$73)), toConsumableArray(createCaseInsensitiveTest(property$73, "start")), [{
  property: property$73,
  value: "start start",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "end")), [{
  property: property$73,
  value: "end end",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "left")), [{
  property: property$73,
  value: "left left",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "right")), [{
  property: property$73,
  value: "right right",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "center")), [{
  property: property$73,
  value: "center center",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "justify")), [{
  property: property$73,
  value: "justify justify",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$73, "match-parent")), [{
  property: property$73,
  value: "match-parent match-parent",
  valid: false
}]);

var textAlignLast = ["-moz-text-align-last", "text-align-last"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "start")), [{
    property: property,
    value: "start start",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "end")), [{
    property: property,
    value: "end end",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "left")), [{
    property: property,
    value: "left left",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "right")), [{
    property: property,
    value: "right right",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "center")), [{
    property: property,
    value: "center center",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "justify")), [{
    property: property,
    value: "justify justify",
    valid: false
  }]));
  return suite;
}, []);

var textDecorationStyle = ["-webkit-text-decoration-style", "-moz-text-decoration-style", "text-decoration-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "solid")), [{
    property: property,
    value: "solid solid",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "double")), [{
    property: property,
    value: "double double",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "dotted")), [{
    property: property,
    value: "dotted dotted",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "dashed")), [{
    property: property,
    value: "dashed dashed",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "wavy")), [{
    property: property,
    value: "wavy wavy",
    valid: false
  }]));
  return suite;
}, []);

var property$74 = "text-orientation";
var textOrientation = [].concat(toConsumableArray(globalTests(property$74)), toConsumableArray(createCaseInsensitiveTest(property$74, "mixed")), [{
  property: property$74,
  value: "mixed mixed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$74, "upright")), [{
  property: property$74,
  value: "upright upright",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$74, "sideways")), [{
  property: property$74,
  value: "sideways sideways",
  valid: false
}]);

var property$75 = "text-rendering";
var textRendering = [].concat(toConsumableArray(globalTests(property$75)), toConsumableArray(createCaseInsensitiveTest(property$75, "auto")), [{
  property: property$75,
  value: "auto auto",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$75, "optimizeSpeed")), [{
  property: property$75,
  value: "optimizeSpeed optimizeSpeed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$75, "optimizeLegibility")), [{
  property: property$75,
  value: "optimizeLegibility optimizeLegibility",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$75, "geometricPrecision")), [{
  property: property$75,
  value: "geometricPrecision geometricPrecision",
  valid: false
}]);

var textSizeAdjust = ["-webkit-text-size-adjust", "-moz-text-size-adjust", "-ms-text-size-adjust", "text-size-adjust"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
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
  }, {
    property: property,
    value: "1% 1%",
    valid: false
  }]));
  return suite;
}, []);

var property$76 = "text-transform";
var textTransform = [].concat(toConsumableArray(globalTests(property$76)), toConsumableArray(createCaseInsensitiveTest(property$76, "none")), [{
  property: property$76,
  value: "none none",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$76, "capitalize")), [{
  property: property$76,
  value: "capitalize capitalize",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$76, "uppercase")), [{
  property: property$76,
  value: "uppercase uppercase",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$76, "lowercase")), [{
  property: property$76,
  value: "lowercase lowercase",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$76, "full-width")), [{
  property: property$76,
  value: "full-width full-width",
  valid: false
}]);

var property$77 = "transform-box";
var transformBox = [].concat(toConsumableArray(globalTests(property$77)), toConsumableArray(createCaseInsensitiveTest(property$77, "border-box")), [{
  property: property$77,
  value: "border-box border-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$77, "fill-box")), [{
  property: property$77,
  value: "fill-box fill-box",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$77, "view-box")), [{
  property: property$77,
  value: "view-box view-box",
  valid: false
}]);

var transformStyle = ["-webkit-transform-style", "-moz-transform-style", "transform-style"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "flat")), [{
    property: property,
    value: "flat flat",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "preserve-3d")), [{
    property: property,
    value: "preserve-3d preserve-3d",
    valid: false
  }]));
  return suite;
}, []);

var property$78 = "unicode-bidi";
var unicodeBidi = [].concat(toConsumableArray(globalTests(property$78)), toConsumableArray(createCaseInsensitiveTest(property$78, "normal")), [{
  property: property$78,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$78, "embed")), [{
  property: property$78,
  value: "embed embed",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$78, "isolate")), [{
  property: property$78,
  value: "isolate isolate",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$78, "bidi-override")), [{
  property: property$78,
  value: "bidi-override bidi-override",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$78, "isolate-override")), [{
  property: property$78,
  value: "isolate-override isolate-override",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$78, "plaintext")), [{
  property: property$78,
  value: "plaintext plaintext",
  valid: false
}]);

var userSelect = ["-webkit-user-select", "-moz-user-select", "-ms-user-select", "user-select"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "auto")), [{
    property: property,
    value: "auto auto",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "text")), [{
    property: property,
    value: "text text",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "none")), [{
    property: property,
    value: "none none",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "contain")), [{
    property: property,
    value: "contain contain",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "all")), [{
    property: property,
    value: "all all",
    valid: false
  }]));
  return suite;
}, []);

var property$79 = "vertical-align";
var verticalAlign = [].concat(toConsumableArray(globalTests(property$79)), toConsumableArray(createCaseInsensitiveTest(property$79, "baseline")), [{
  property: property$79,
  value: "baseline baseline",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "sub")), [{
  property: property$79,
  value: "sub sub",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "super")), [{
  property: property$79,
  value: "super super",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "text-top")), [{
  property: property$79,
  value: "text-top text-top",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "text-bottom")), [{
  property: property$79,
  value: "text-bottom text-bottom",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "middle")), [{
  property: property$79,
  value: "middle middle",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "top")), [{
  property: property$79,
  value: "top top",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$79, "bottom")), [{
  property: property$79,
  value: "bottom bottom",
  valid: false
}, {
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
  value: "1% 1%",
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
}, {
  property: property$79,
  value: "\"1rem\"",
  valid: false
}, {
  property: property$79,
  value: "0 0",
  valid: false
}]);

var property$80 = "visibility";
var visibility = [].concat(toConsumableArray(globalTests(property$80)), toConsumableArray(createCaseInsensitiveTest(property$80, "visible")), [{
  property: property$80,
  value: "visible visible",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$80, "hidden")), [{
  property: property$80,
  value: "hidden hidden",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$80, "collapse")), [{
  property: property$80,
  value: "collapse collapse",
  valid: false
}]);

var property$81 = "white-space";
var whiteSpace = [].concat(toConsumableArray(globalTests(property$81)), toConsumableArray(createCaseInsensitiveTest(property$81, "normal")), [{
  property: property$81,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$81, "pre")), [{
  property: property$81,
  value: "pre pre",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$81, "nowrap")), [{
  property: property$81,
  value: "nowrap nowrap",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$81, "pre-wrap")), [{
  property: property$81,
  value: "pre-wrap pre-wrap",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$81, "pre-line")), [{
  property: property$81,
  value: "pre-line pre-line",
  valid: false
}]);

var property$82 = "will-change";
var willChange = [].concat(toConsumableArray(globalTests(property$82)), toConsumableArray(createCaseInsensitiveTest(property$82, "auto")), [{
  property: property$82,
  value: "auto auto",
  valid: false
}, {
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
  value: "\"foobar\"",
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
var wordBreak = [].concat(toConsumableArray(globalTests(property$83)), toConsumableArray(createCaseInsensitiveTest(property$83, "normal")), [{
  property: property$83,
  value: "normal normal",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$83, "break-all")), [{
  property: property$83,
  value: "break-all break-all",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$83, "keep-all")), [{
  property: property$83,
  value: "keep-all keep-all",
  valid: false
}]);

var property$84 = "word-spacing";
var wordSpacing = [].concat(toConsumableArray(globalTests(property$84)), toConsumableArray(createCaseInsensitiveTest(property$84, "normal")), [{
  property: property$84,
  value: "normal normal",
  valid: false
}, {
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
  value: "\"1rem\"",
  valid: false
}, {
  property: property$84,
  value: "12.%",
  valid: false
}, {
  property: property$84,
  value: "42.2.3.4.7.8.1.2%",
  valid: false
}, {
  property: property$84,
  value: "0 0",
  valid: false
}]);

var writingMode = ["-webkit-writing-mode", "writing-mode"].reduce(function (suite, property) {
  suite.push.apply(suite, toConsumableArray(globalTests(property)).concat(toConsumableArray(createCaseInsensitiveTest(property, "horizontal-tb")), [{
    property: property,
    value: "horizontal-tb horizontal-tb",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "vertical-rl")), [{
    property: property,
    value: "vertical-rl vertical-rl",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "vertical-lr")), [{
    property: property,
    value: "vertical-lr vertical-lr",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "sideways-rl")), [{
    property: property,
    value: "sideways-rl sideways-rl",
    valid: false
  }], toConsumableArray(createCaseInsensitiveTest(property, "sideways-lr")), [{
    property: property,
    value: "sideways-lr sideways-lr",
    valid: false
  }]));
  return suite;
}, []);

var property$85 = "-ms-writing-mode";
var msWritingMode = [].concat(toConsumableArray(globalTests(property$85)), toConsumableArray(createCaseInsensitiveTest(property$85, "horizontal-tb")), [{
  property: property$85,
  value: "horizontal-tb horizontal-tb",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "vertical-rl")), [{
  property: property$85,
  value: "vertical-rl vertical-rl",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "vertical-lr")), [{
  property: property$85,
  value: "vertical-lr vertical-lr",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "sideways-rl")), [{
  property: property$85,
  value: "sideways-rl sideways-rl",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "sideways-lr")), [{
  property: property$85,
  value: "sideways-lr sideways-lr",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "lr-tb")), [{
  property: property$85,
  value: "lr-tb lr-tb",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "tb-rl")), [{
  property: property$85,
  value: "tb-rl tb-rl",
  valid: false
}], toConsumableArray(createCaseInsensitiveTest(property$85, "tb-lr")), [{
  property: property$85,
  value: "tb-lr tb-lr",
  valid: false
}]);

var property$86 = "z-index";
var zIndex = [].concat(toConsumableArray(globalTests(property$86)), toConsumableArray(createCaseInsensitiveTest(property$86, "auto")), [{
  property: property$86,
  value: "auto auto",
  valid: false
}, {
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
}, {
  property: property$86,
  value: "\"100\"",
  valid: false
}, {
  property: property$86,
  value: "10 10",
  valid: false
}]);

var suites = [msOverflowStyle, mozAppearance, mozFloatEdge, mozForceBrokenImageIcon, mozOrient, mozStackSizing, mozTextBlink, mozUserFocus, mozUserInput, mozUserModify, mozWindowShadow, webkitBorderBeforeColor, webkitBorderBeforeStyle, webkitBorderBeforeWidth, webkitMaskRepeat, webkitMaskRepeatX, webkitTapHighlightColor, webkitTextStrokeWidth, webkitTouchCallout, alignContent, msFlexLinePack, msFlexAlign, alignItems, alignSelf, msFlexItemAlign, animationDelay, animationDirection, animationFillMode, animationIterationCount, animationName, animationPlayState, animationTimingFunction, appearance, backfaceVisibility, backgroundAttachment, backgroundBlendMode, backgroundClip, backgroundPosition, borderBottomLeftRadius, borderBottomStyle, borderBottomWidth, borderCollapse, borderColor, bottom, boxAlign, boxDecorationBreak, boxDirection, boxFlex, boxLines, boxOrient, boxPack, boxSizing, boxSuppress, pageBreakAfter, webkitColumnBreakInside, captionSide, clear, columnCount, columnFill, columnGap, columnSpan, columnWidth, direction, display, displayInside, displayList, displayOutside, emptyCells, mozBoxOrient, mozBoxDirection, flexDirection, flexWrap, float, fontKerning, fontLanguageOverride, fontSize, fontSizeAdjust, fontStretch, fontStyle, fontVariantCaps, fontVariantPosition, fontWeight, gridColumnGap, gridTemplateAreas, hyphens, imageRendering, msInterpolationMode, imeMode, initialLetterAlign, isolation, mozBoxPack, justifyContent, msFlexPack, letterSpacing, lineBreak, lineHeight, listStylePosition, maskComposite, maskMode, maskType, maxBlockSize, minBlockSize, mixBlendMode, objectFit, objectPosition, outlineColor, outlineStyle, overflow, overflowClipBox, overflowWrap, paddingBlockEnd, pageBreakInside, perspective, pointerEvents, position, resize, rubyAlign, rubyMerge, rubyPosition, scrollBehavior, scrollSnapCoordinate, scrollSnapType, tabSize, tableLayout, textAlign, textAlignLast, textDecorationStyle, textOrientation, textRendering, textSizeAdjust, textTransform, transformBox, transformStyle, unicodeBidi, userSelect, verticalAlign, visibility, whiteSpace, willChange, wordBreak, wordSpacing, writingMode, msWritingMode, zIndex];

function macro(t, property, value, valid) {
  t.is(cssValues(property, value), valid);
}

macro.title = function (title, property, value, valid) {
  var validStr = ' (' + (valid ? 'valid' : 'invalid') + ')';

  if (typeof value === 'string') {
    return property + ': ' + value + validStr;
  }

  return '[parsed nodes]' + validStr;
};

suites.forEach(function (suite) {
  suite.forEach(function (_ref) {
    var property = _ref.property;
    var value = _ref.value;
    var valid = _ref.valid;
    return test(macro, property, value, valid);
  });
});
test('should accept an ast', macro, 'color', valueParser('blue'), true);