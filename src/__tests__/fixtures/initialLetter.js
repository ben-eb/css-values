export default {
    syntax: 'normal | [<number> <integer>?]',
    ast: [{
        type: 'keyword',
        value: 'normal',
    }, {
        type: 'group',
        order: 'defined',
        values: [{
            type: 'data',
            value: 'number',
            optional: false,
        }, {
            type: 'data',
            value: 'integer',
            optional: true,
        }],
    }],
};
