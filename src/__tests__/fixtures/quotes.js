export default {
    syntax: '[<string> <string>]+ | none',
    ast: [{
        type: 'group',
        values: [{
            type: 'data',
            value: 'string',
            optional: false,
        }, {
            type: 'data',
            value: 'string',
            optional: false,
        }],
        order: 'defined',
        separator: ' ',
        min: 1,
        max: false,
    }, {
        type: 'keyword',
        value: 'none',
    }],
};
