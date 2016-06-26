import data from '../data/data.json';
import HtmlEntities from 'html-entities';

const decode = new HtmlEntities.AllHtmlEntities().decode;

function positionGrammar (what) {
    return what.replace('<position>', '[ [ left | center | right | top | bottom | <percentage> | <length> ] | [ left | center | right | <percentage> | <length> ] [ top | center | bottom | <percentage> | <length> ] | [ center | [ left | right ] [ <percentage> | <length> ]? ] && [ center | [ top | bottom ] [ <percentage> | <length> ]? ] ]');
}

const overrides = {
    // properties
    '-webkit-tap-highlight-color': '<color>#',
    'text-emphasis-style': 'none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>',
    'text-indent': '[ <length> | <percentage> ] && hanging? && each-line?',
    // syntaxes
    'feature-value-name': '<IDENT>',
    'single-animation-name': 'none | <IDENT>',
    'single-transition-property': 'all | <IDENT>'
};

export let properties = Object.keys(data.properties).map(key => {
    let syntax = positionGrammar(decode(data.properties[key].syntax));
    if (overrides[key]) {
        syntax = overrides[key];
    }
    return {
        ...data.properties[key],
        name: key,
        syntax: syntax
    };
});

// The filter function is temporary to stop a RangeError in the
// image and image() syntaxes. Perhaps we should do nested
// parsing in the same parser, and keep a call stack to catch
// circular syntaxes instead.

const filter = key => key !== 'image' && key !== 'image()';

export let syntaxes = Object.keys(data.syntaxes).filter(filter).map(key => {
    let syntax = positionGrammar(decode(data.syntaxes[key]));
    if (overrides[key]) {
        syntax = overrides[key];
    }
    return {
        name: key,
        syntax: syntax
    };
});
