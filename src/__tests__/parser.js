import ava from 'ava';
import Parser from '../parser';

const suite = [
    ['block | inline', {
        nodes: [{
            type: 'keyword',
            value: 'block',
            exclusive: true
        }, {
            type: 'keyword',
            value: 'inline',
            exclusive: true
        }]
    }],
    ['<string>+', {
        nodes: [{
            type: 'data',
            value: 'string',
            exclusive: false,
            repeat: {
                min: 1,
                max: false,
                separator: ' '
            }
        }]
    }],
    ['<time>#', {
        nodes: [{
            type: 'data',
            value: 'time',
            exclusive: false,
            repeat: {
                min: 1,
                max: false,
                separator: ','
            }
        }]
    }],
    ['<length> <length>?', {
        nodes: [{
            type: 'data',
            value: 'length',
            exclusive: false
        }, {
            type: 'data',
            value: 'length',
            exclusive: false,
            optional: true
        }]
    }],
    ['[ over | under ] && [ right | left ]', {
        nodes: [{
            type: 'group',
            nodes: [{
                type: 'keyword',
                value: 'over',
                exclusive: true
            }, {
                type: 'keyword',
                value: 'under',
                exclusive: true
            }],
            exclusive: false,
            required: true,
            order: 'any'
        }, {
            type: 'group',
            nodes: [{
                type: 'keyword',
                value: 'right',
                exclusive: true
            }, {
                type: 'keyword',
                value: 'left',
                exclusive: true
            }],
            required: true,
            order: 'any'
        }]
    }],
    ['[ <length> | <number> ]{1,4}', {
        nodes: [{
            type: 'group',
            nodes: [{
                type: 'data',
                value: 'length',
                exclusive: true
            }, {
                type: 'data',
                value: 'number',
                exclusive: true
            }],
            exclusive: false,
            repeat: {
                min: 1,
                max: 4,
                separator: ' '
            }
        }]
    }],
    ['none | [ weight || style ]', {
        nodes: [{
            type: 'keyword',
            value: 'none',
            exclusive: true
        }, {
            type: 'group',
            nodes: [{
                type: 'keyword',
                value: 'weight',
                exclusive: false,
                order: 'any',
                optional: true
            }, {
                type: 'keyword',
                value: 'style',
                exclusive: false,
                order: 'any',
                optional: true
            }]
        }]
    }],
    ["<'grid-column-gap'> <'grid-row-gap'>?", {
        nodes: [{
            type: 'data',
            value: 'length',
            exclusive: false
        }, {
            type: 'data',
            value: 'length',
            exclusive: false,
            optional: true
        }]
    }],
    ["normal | [<number> <integer>?]", {
        nodes: [{
            type: 'keyword',
            value: 'normal',
            exclusive: true
        }, {
            type: 'group',
            nodes: [{
                type: 'data',
                value: 'number',
                exclusive: false
            }, {
                type: 'data',
                value: 'integer',
                exclusive: false,
                optional: true
            }]
        }]
    }]
];

suite.forEach(spec => ava(spec[0], t => t.same(new Parser(spec[0]), spec[1])));
