import endsWith from 'ends-with';

export default (node) => {
    const {value} = node;
    
    if (node.type !== 'word') {
        return false;
    }

    return !isNaN(value) && !endsWith(value, '.');
};
