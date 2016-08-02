export default {
    syntax: '[ over | under ] && [ right | left ]',
    ast: [{
        type: 'group',
        order: 'any',
        min: 1,
        values: [{
            type: 'group',
            values: [{
                type: 'keyword',
                value: 'over',
            }, {
                type: 'keyword',
                value: 'under',
            }],
            optional: false,
        }, {
            type: 'group',
            values: [{
                type: 'keyword',
                value: 'right',
            }, {
                type: 'keyword',
                value: 'left',
            }],
            optional: false,
        }],
        max: 2,
    }],
};
