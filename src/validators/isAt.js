import isKeyword from './isKeyword';

export default function isAt (node) {
    return isKeyword(node, 'at');
}
