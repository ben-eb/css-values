import {walk} from 'postcss-value-parser';
import isAngle from './isAngle';
import isFunction from './isFunction';
import isInteger from './isInteger';
import isLength from './isLength';
import isNumber from './isNumber';
import isTime from './isTime';
import isPercentage from './isPercentage';
import isVariable from './isVariable';

const operators = ['+', '-', '*', '/'];
const operatorsRegExp = /[+\-\*\/]/i;

export default function (node) {
    if (
        !isFunction(node, 'calc')
        || !node.nodes
        || !node.nodes.length
    ) {
        return false;
    }

    let valid = true;
    let lastNonSpaceValue = false;

    walk(node.nodes, (child) => {
        const {type, value} = child; 
        // if an expression starts with operator
        if (!lastNonSpaceValue && ~operators.indexOf(value)) {
            valid = false;
        }
        // store last non space node
        if (type !== 'space') {
            lastNonSpaceValue = value;
        }
        // only variables and () functions are allowed
        if (            
            !isVariable(child)
            && type === 'function'
        ) {
            if (value.length > 0) {
                valid = false;
            }            
            if (!child.nodes.length || !child.nodes) {
                valid = false;
            }
        }
        // invalidate any invalid word node
        if (type === 'word'
            && !isAngle(child)
            && !isLength(child)
            && !isTime(child)
            && !isInteger(child)
            && !isNumber(child)
            && !isPercentage(child)
            && operators.indexOf(value) < 0
            ) {
            // + and - must be surrounded by spaces
            if (value.indexOf('+') > 0 || value.indexOf('-') > 0) {
                valid = false;
            }
            // expression can't endwith operator
            if (~operators.indexOf(value[value.length-1])) {
                valid = false;
            }
            // unknown word node w/o operators is invalid
            if (!operatorsRegExp.test(value)) {
                valid = false;
            }
        }
    });
    // if an expression ends with operator
    if (~operators.indexOf(lastNonSpaceValue)) {
        valid = false;
    }

    return valid;
}

export const type = 'node';
