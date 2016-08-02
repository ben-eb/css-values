export default {
    syntax: 'none | <track-list> | <auto-track-list> | subgrid <line-name-list>?',
    ast: [{
        type: 'keyword',
        value: 'none',
    }, {
        type: 'data',
        value: 'track-list',
    }, {
        type: 'data',
        value: 'auto-track-list',
    }, {
        type: 'group',
        order: 'defined',
        values: [{
            type: 'keyword',
            value: 'subgrid',
            optional: false,
        }, {
            type: 'data',
            value: 'line-name-list',
            optional: true,
        }],
    }],
};
