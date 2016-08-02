export default {
    syntax: 'none | repeat(<length>)',
    ast: [{
        type: 'keyword',
        value: 'none',
    }, {
        type: 'function',
        value: 'repeat',
        values: [{
            type: 'data',
            value: 'length',
        }],
    }],
};
