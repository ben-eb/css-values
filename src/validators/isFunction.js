export default function isFunction (node, value) {
    return node.type === 'function' && node.value.toLowerCase() === value;
}
