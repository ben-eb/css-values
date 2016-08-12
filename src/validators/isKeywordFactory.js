import isKeyword from './isKeyword';

export default function isKeywordFactory (keywords) {
    return function wrappedIsKeyword (parsed) {
        if (parsed.nodes.length === 1) {
            return isKeyword(parsed.nodes[0], keywords);
        }
        return false;
    };
}
