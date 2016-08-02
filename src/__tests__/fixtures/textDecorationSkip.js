export default {
    syntax: 'none | [ objects || spaces || ink || edges || box-decoration ]',
    ast: [{
        type: 'keyword',
        value: 'none',
    }, {
        type: 'group',
        order: 'any',
        min: 1,
        max: 5,
        values: [{
            type: 'keyword',
            value: 'objects',
            optional: true,
        }, {
            type: 'keyword',
            value: 'spaces',
            optional: true,
        }, {
            type: 'keyword',
            value: 'ink',
            optional: true,
        }, {
            type: 'keyword',
            value: 'edges',
            optional: true,
        }, {
            type: 'keyword',
            value: 'box-decoration',
            optional: true,
        }],
    }],
};
