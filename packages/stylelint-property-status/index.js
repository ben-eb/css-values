import {createPlugin, utils} from 'stylelint';
import data from './data/data.json';

const {ruleMessages, report} = utils;

export const ruleName = `plugin/property-status`;

export const messages = ruleMessages(ruleName, {
    rejected: property => `Unexpected property "${property}"`,
});

function isValid (node, {statuses, scssCompatibility}) {
    if (scssCompatibility && node.prop[0] === '$') {
        return true;
    }
    const entry = data[node.prop];
    if (!Array.isArray(statuses)) {
        statuses = [statuses];
    }
    return ~statuses.indexOf(entry);
}

export default createPlugin(ruleName, (opts = {}) => {
    opts = {
        statuses: 'standard',
        scssCompatibility: false,
        ...opts,
    };
    return (css, result) => {
        css.walkDecls(node => {
            if (isValid(node, opts)) {
                return;
            }
            report({
                ruleName,
                result,
                node,
                message: messages.rejected(node.prop),
            });
        });
    }
});
