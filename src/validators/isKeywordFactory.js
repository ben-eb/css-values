import {invalidMessage} from '../util/validationMessages';
import isKeyword from './isKeyword';

export default function isKeywordFactory (keywords) {
    return function wrappedIsKeyword (valueParserAST) {
        if (valueParserAST.nodes.length !== 1) {
            return invalidMessage('Expected a single value to be passed.');
        }
        return isKeyword(valueParserAST.nodes[0], keywords);
    };
}
