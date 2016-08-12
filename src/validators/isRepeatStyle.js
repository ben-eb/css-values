import isKeyword from './isKeyword';
import isComma from './isComma';
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
        if (isKeyword(node, singleValues)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isKeyword(node, multipleValues) || isVariable(node)) {
            if (
                group.some(n => isKeyword(n, singleValues)) ||
                group.length === 2
            ) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isComma(node)) {
            group = [];
            return false;
        } else if (node.type !== 'space') {
            valid = false;
        }
        return false;
    });
    return valid;
};

export const type = 'parsed';
