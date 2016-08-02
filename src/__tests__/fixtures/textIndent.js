export default {
    syntax: '[ <length> | <percentage> ] && hanging? && each-line?',
    ast: [{
        type: 'group',
        order: 'any',
        min: 1,
        values: [{
            type: 'group',
            values: [{
                type: 'data',
                value: 'length',
            }, {
                type: 'data',
                value: 'percentage',
            }],
            optional: false,
        }, {
            type: 'keyword',
            value: 'hanging',
            optional: true,
        }, {
            type: 'keyword',
            value: 'each-line',
            optional: true,
        }],
        max: 3,
    }],
};
