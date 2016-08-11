import HtmlEntities from 'html-entities';
import data from '../data/data.json';

const {decode} = new HtmlEntities.AllHtmlEntities();

const overrides = {
    // properties
    '-webkit-tap-highlight-color': '<color>#',
    '-webkit-mask-repeat': '<repeat-style>#',
    'animation-timing-function': '<single-transition-timing-function>#',
    cursor: '[ [<url> [<x> <y>]?,]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out ] ]',
    'text-emphasis-style': 'none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>',
    'text-indent': '[ <length> | <percentage> ] && hanging? && each-line?',
    // syntaxes
    'feature-value-name': '<IDENT>',
    'single-transition-property': 'all | <IDENT>',
};

export const properties = Object.keys(data.properties).map(name => {
    let syntax = decode(data.properties[name].syntax);
    if (overrides[name]) {
        syntax = overrides[name];
    }
    return {
        ...data.properties[name],
        name,
        syntax: syntax.trim(),
    };
});

export const syntaxes = Object.keys(data.syntaxes).map(name => {
    let syntax = decode(data.syntaxes[name]);
    if (overrides[name]) {
        syntax = overrides[name];
    }
    return {
        name,
        syntax,
    };
});
