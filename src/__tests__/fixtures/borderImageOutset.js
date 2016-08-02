export default {
    syntax: '[ <length> | <number> ]{1,4}',
    ast: [{
        min: 1,
        max: 4,
        separator: ' ',
        type: 'group',
        values: [{
            type: 'data',
            value: 'length',
        }, {
            type: 'data',
            value: 'number',
        }],
    }],
};
