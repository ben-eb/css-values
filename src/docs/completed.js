import heading from 'mdast-util-heading-range';
import percentage from '../util/percentage';
import {properties} from '../data';
import completed from '../completed';

function createItem (value) {
    return {
        type: 'listItem',
        loose: false,
        children: [{
            type: 'inlineCode',
            value,
        }],
    };
}

function attacher () {
    return tree => {
        heading(tree, 'Property support', (start, nodes, end) => {
            const done = completed.length;
            const total = properties.length;
            const children = [{
                type: 'paragraph',
                children: [{
                    type: 'text',
                    value: `We support ${done} of ${total} CSS properties (${percentage(done, total)}%).`,
                }],
            }, {
                type: 'list',
                ordered: false,
                children: completed.map(createItem),
            }];

            const node = {
                type: 'root',
                children,
            };

            return [start, node, end];
        });
    };
};

/*
 * Expose as CJS for remark's benefit.
 */

module.exports = attacher;
