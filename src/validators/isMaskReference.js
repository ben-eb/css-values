import isImage from './isImage';
import isUrl from './isUrl';
import isKeyword from './isKeyword';

export default (node) => {
    return isImage(node)
        || isUrl(node)
        || isKeyword(node, 'none');
};
