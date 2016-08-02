const keywords = [
    'auto',
    'default',
    'none',
    'context-menu',
    'help',
    'pointer',
    'progress',
    'wait',
    'cell',
    'crosshair',
    'text',
    'vertical-text',
    'alias',
    'copy',
    'move',
    'no-drop',
    'not-allowed',
    'grab',
    'grabbing',
    'e-resize',
    'n-resize',
    'ne-resize',
    'nw-resize',
    's-resize',
    'se-resize',
    'sw-resize',
    'w-resize',
    'ew-resize',
    'ns-resize',
    'nesw-resize',
    'nwse-resize',
    'col-resize',
    'row-resize',
    'all-scroll',
    'zoom-in',
    'zoom-out',
];

export default {
    syntax: `[ [<url> [<x> <y>]?,]* [ ${keywords.join(' | ')} ] ]`,
    ast: [{
        type: 'group',
        values: [{
            type: 'group',
            order: 'defined',
            values: [{
                type: 'group',
                values: [{
                    type: 'data',
                    value: 'url',
                    optional: false,
                }, {
                    type: 'group',
                    values: [{
                        type: 'data',
                        value: 'x',
                        optional: false,
                    }, {
                        type: 'data',
                        value: 'y',
                        optional: false,
                    }],
                    optional: true,
                    order: 'defined',
                }, {
                    type: 'keyword',
                    value: ',',
                }],
                order: 'defined',
                min: 0,
                max: false,
                optional: false,
            }, {
                type: 'group',
                values: keywords.map(value => {
                    return {
                        type: 'keyword',
                        value,
                    };
                }),
                optional: false,
            }],
        }],
    }],
};
