// [ &lt;length-percentage&gt; | auto ]{1,2} | cover | contain

import getArguments from './getArguments';
import isKeyword from './isKeyword';
import isLengthPercentage from './isLengthPercentage';
import isVariable from './isVariable';

export const sizeKeywords = [
    'cover',
    'contain',
];

const auto = 'auto';

function validateNode (node) {
    return isKeyword(node, auto) || isLengthPercentage(node) || isVariable(node);
}

function validateGroup (group) {
    const {length} = group;
    if (length && length < 4) {
        if (!validateNode(group[0])) {
            return false;
        }
        if (group[2] && !validateNode(group[2])) {
            return false;
        }
        return true;
    }
    return false;
}

export default function isBgSize (parsed) {
    if (parsed.nodes.length === 1 && isKeyword(parsed.nodes[0], sizeKeywords)) {
        return true;
    }

    return getArguments(parsed).every(validateGroup);
}
