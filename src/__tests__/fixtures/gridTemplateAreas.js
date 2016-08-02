export default {
    syntax: 'none | <string>+',
    ast: [{
        type: 'keyword',
        value: 'none',
    }, {
        type: 'data',
        value: 'string',
        min: 1,
        max: false,
        separator: ' ',
    }],
};
