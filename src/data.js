import HtmlEntities from 'html-entities';
import data from '../data/data.json';

const {decode} = new HtmlEntities.AllHtmlEntities();

const overrides = {
    // properties
    '-webkit-tap-highlight-color': '<color>#',
    '-webkit-mask-attachment': '<attachment>#',
    '-webkit-mask-repeat': '<repeat-style>#',
    'animation-timing-function': '<single-transition-timing-function>#',
    bottom: '<length-percentage> | auto',
    cursor: '[ [<url> [<x> <y>]?,]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | grab | grabbing | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out ] ]',
    left: '<length-percentage> | auto',
    'line-height': 'normal | <number> | <length-percentage>',
    'margin-bottom': '<length-percentage> | auto',
    'margin-left': '<length-percentage> | auto',
    'margin-right': '<length-percentage> | auto',
    'margin-top': '<length-percentage> | auto',
    'max-height': '<length-percentage> | none | max-content | min-content | fit-content | fill-available',
    'max-width': '<length-percentage> | none | max-content | min-content | fit-content | fill-available',
    'min-height': '<length-percentage> | none | max-content | min-content | fit-content | fill-available',
    'min-width': '<length-percentage> | none | max-content | min-content | fit-content | fill-available',
    'padding-bottom': '<length-percentage>',
    'padding-left': '<length-percentage>',
    'padding-right': '<length-percentage>',
    'padding-top': '<length-percentage>',
    right: '<length-percentage> | auto',
    'text-emphasis-style': 'none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>',
    'text-indent': '[ <length> | <percentage> ] && hanging? && each-line?',
    top: '<length-percentage> | auto',
    'vertical-align': 'baseline | sub | super | text-top | text-bottom | middle | top | bottom | <length-percentage>',
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
