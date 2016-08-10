import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export default function isCaseInsensitiveKeywordFactory (keywords) {
    return function isKeyword (parsed) {
        if (parsed.nodes.length === 1) {
            return isCaseInsensitiveKeyword(parsed.nodes[0], keywords);
        }
        return false;
    };
}
