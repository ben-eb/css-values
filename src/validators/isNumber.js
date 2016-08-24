import endsWith from 'ends-with';

export default (node) => {
    if (node.type !== 'word') {
        return false;
    }

    return !isNaN(node.value) && !endsWith(node.value, '.');
};
