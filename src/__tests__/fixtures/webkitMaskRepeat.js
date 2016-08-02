export default {
    syntax: '<repeat-style>[, <repeat-style>]*',
    ast: [{
        type: 'data',
        value: 'repeat-style',
    }, {
        type: 'group',
        values: [{
            type: 'keyword',
            value: ',',
            optional: false,
        }, {
            type: 'data',
            value: 'repeat-style',
            optional: false,
        }],
        order: 'defined',
        min: 0,
        max: false,
        optional: true,
    }],
};
