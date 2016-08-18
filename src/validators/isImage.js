import isUrl from './isUrl';

export default function isImage (node) {
    return isUrl(node);
}

export const type = 'node';
