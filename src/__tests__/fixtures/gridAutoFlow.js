export default {
    syntax: '[ row | column ] || dense',
    ast: [{
        type: 'group',
        order: 'any',
        min: 1,
        max: 2,
        values: [{
            type: 'group',
            optional: true,
            values: [{
                type: 'keyword',
                value: 'row',
            }, {
                type: 'keyword',
                value: 'column',
            }],
        }, {
            type: 'keyword',
            value: 'dense',
            optional: true,
        }],
    }],
};
