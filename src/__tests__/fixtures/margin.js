export default {
    syntax: '[ <length> | <percentage> | auto ]{1,4}',
    ast: [{
        type: 'group',
        values: [{
            type: 'data',
            value: 'length',
        }, {
            type: 'data',
            value: 'percentage',
        }, {
            type: 'keyword',
            value: 'auto',
        }],
        separator: ' ',
        min: 1,
        max: 4,
    }],
};
