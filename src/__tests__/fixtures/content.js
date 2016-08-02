export default {
    syntax: 'normal | none | [ <string> | <uri> | <counter> | attr() | open-quote | close-quote | no-open-quote | no-close-quote ]+',
    ast: [{
        type: 'keyword',
        value: 'normal',
    }, {
        type: 'keyword',
        value: 'none',
    }, {
        type: 'group',
        values: [{
            type: 'data',
            value: 'string',
        }, {
            type: 'data',
            value: 'uri',
        }, {
            type: 'data',
            value: 'counter',
        }, {
            type: 'function',
            value: 'attr',
            values: [],
        }, {
            type: 'keyword',
            value: 'open-quote',
        }, {
            type: 'keyword',
            value: 'close-quote',
        }, {
            type: 'keyword',
            value: 'no-open-quote',
        }, {
            type: 'keyword',
            value: 'no-close-quote',
        }],
        separator: ' ',
        min: 1,
        max: false,
    }],
};
