import isKeyword from './isKeyword';

export default function isKeywordFactory (keywords) {
    return function wrappedIsKeyword (valueParserAST) {
        if (valueParserAST.nodes.length === 1) {
            return isKeyword(valueParserAST.nodes[0], keywords);
        }
        return false;
    };
}
