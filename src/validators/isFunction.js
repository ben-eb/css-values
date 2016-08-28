import lowercase from './lowercase';

export default function isFunction (node, values) {
    if (node.type !== 'function') {
        return false;
    }
    if (Array.isArray(values)) {
        return ~values.map(lowercase).indexOf(lowercase(node.value));
    }
    return lowercase(node.value) === values;
}
