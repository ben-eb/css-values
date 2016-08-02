export default {
    syntax: '<br-width> || <br-style> || <color>',
    ast: [{
        type: 'group',
        order: 'any',
        min: 1,
        max: 3,
        values: [{
            type: 'data',
            value: 'br-width',
            optional: true,
        }, {
            type: 'data',
            value: 'br-style',
            optional: true,
        }, {
            type: 'data',
            value: 'color',
            optional: true,
        }],
    }],
};
