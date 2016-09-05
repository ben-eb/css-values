import {walk} from 'postcss-value-parser';
import getArguments from './getArguments';
import isColor from './isColor';
import isEven from './isEven';
import isLength from './isLength';
import isSpace from './isSpace';
import isVariable from './isVariable';

function validateShadow (nodes) {
    let hasColor = false;
    let hasLength = 0;
    let hasVariable = false;
    let startsWithLength = false;
    let valid = true;

    walk(nodes, (child, index) => {
        const even = isEven(index);
        if (even) {
            if (isLength(child)) {
                if (!index) {
                    startsWithLength = true;
                }
                if (hasLength && hasColor && startsWithLength) {
                    valid = false;
                    return false;
                }
                hasLength ++;
                if (hasLength > 3) {
                    valid = false;
                }
            } else if (isColor(child)) {
                if (hasColor) {
                    valid = false;
                } else {
                    hasColor = true;
                }
            } else if (isVariable(child)) {
                hasVariable = true;
            } else {
                valid = false;
            }
        } else if (!even && !isSpace(child)) {
            valid = false;
        }

        return false;
    });

    if (!hasVariable && hasLength < 2 || nodes.length > 7) {
        return false;
    }

    return valid;
}

export default function isShadowT (valueParserAST) {
    return getArguments(valueParserAST).every(validateShadow);
}
