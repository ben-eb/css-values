export default {
    syntax: 'auto | none | [[ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ]] | manipulation',
    ast: [{
        type: 'keyword',
        value: 'auto',
    }, {
        type: 'keyword',
        value: 'none',
    }, {
        type: 'group',
        values: [{
            type: 'group',
            order: 'any',
            min: 1,
            values: [{
                type: 'group',
                values: [{
                    type: 'keyword',
                    value: 'pan-x',
                }, {
                    type: 'keyword',
                    value: 'pan-left',
                }, {
                    type: 'keyword',
                    value: 'pan-right',
                }],
                optional: true,
            }, {
                type: 'group',
                values: [{
                    type: 'keyword',
                    value: 'pan-y',
                }, {
                    type: 'keyword',
                    value: 'pan-up',
                }, {
                    type: 'keyword',
                    value: 'pan-down',
                }],
                optional: true,
            }],
            max: 2,
        }],
    }, {
        type: 'keyword',
        value: 'manipulation',
    }],
};
