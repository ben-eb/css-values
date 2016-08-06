import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
import isVariable from './isVariable';

const singleValues = [
    'repeat-x',
    'repeat-y',
];

const multipleValues = [
    'repeat',
    'space',
    'round',
    'no-repeat',
];

export default parsed => {
    let group = [];
    let valid = true;
    if (parsed.nodes[parsed.nodes.length - 1].type === 'div') {
        return false;
    }
    parsed.walk(node => {
        if (isCaseInsensitiveKeyword(node, singleValues)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isCaseInsensitiveKeyword(node, multipleValues) || isVariable(node)) {
            if (
                group.some(n => isCaseInsensitiveKeyword(n, singleValues)) ||
                group.length === 2
            ) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (node.type === 'div') {
            if (node.value === ',') {
                group = [];
                return false;
            }
            valid = false;
        } else if (node.type !== 'space') {
            valid = false;
        }
        return false;
    });
    return valid;
};

export const type = 'parsed';
