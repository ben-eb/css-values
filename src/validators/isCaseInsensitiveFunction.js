export default function isCaseInsensitiveFunction (node, value) {
    return node.type === 'function' && node.value.toLowerCase() === value;
}
