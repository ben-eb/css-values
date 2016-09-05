import isKeyword from './isKeyword';
import isComma from './isComma';
import isSpace from './isSpace';
import isVariable from './isVariable';

const singleValues = [
    'repeat-x',
    'repeat-y',
];

const multipleValues = [
    'repeat',
    'space',
    'round',
    'no-repeat',
];

export default valueParserAST => {
    let group = [];
    let valid = true;
    if (valueParserAST.nodes[valueParserAST.nodes.length - 1].type === 'div') {
        return false;
    }
    valueParserAST.walk(node => {
        if (isKeyword(node, singleValues)) {
            if (group.length) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isKeyword(node, multipleValues) || isVariable(node)) {
            if (
                group.some(n => isKeyword(n, singleValues)) ||
                group.length === 2
            ) {
                valid = false;
                return false;
            }
            group.push(node);
        } else if (isComma(node)) {
            group = [];
            return false;
        } else if (!isSpace(node)) {
            valid = false;
        }
        return false;
    });
    return valid;
};
