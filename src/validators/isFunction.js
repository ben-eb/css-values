import lowercase from './lowercase';

export default function isFunction (node, value) {
    return node.type === 'function' && lowercase(node.value) === value;
}
