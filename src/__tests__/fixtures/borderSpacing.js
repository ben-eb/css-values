export default {
    syntax: '<length> <length>?',
    ast: [{
        type: 'group',
        order: 'defined',
        values: [{
            type: 'data',
            value: 'length',
            optional: false,
        }, {
            type: 'data',
            value: 'length',
            optional: true,
        }],
    }],
};
