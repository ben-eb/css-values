import isImage from './isImage';
import isKeyword from './isKeyword';

export default function isBgImage (node) {
    return isImage(node) || isKeyword(node, 'none');
}

export const type = 'node';
