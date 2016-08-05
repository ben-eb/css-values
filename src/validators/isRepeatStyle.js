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
        if (node.type === 'word' && ~singleValues.indexOf(node.value)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node.value);
        } else if (~multipleValues.indexOf(node.value) || isVariable(node)) {
            if (
                group.some(val => ~singleValues.indexOf(val)) ||
                group.length === 2
            ) {
                valid = false;
                return false;
            }
            group.push(node.value);
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
