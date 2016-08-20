import isComma from './isComma';

export default function getArguments (node) {
    return node.nodes.reduce((list, child) => {
        if (isComma(child)) {
            list.push([]);
        } else {
            list[list.length - 1].push(child);
        }
        return list;
    }, [[]]);
}
