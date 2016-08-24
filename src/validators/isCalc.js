import {walk} from 'postcss-value-parser';
import isAngle from './isAngle';
import isFunction from './isFunction';
import isInteger from './isInteger';
import isLength from './isLength';
// import isNumber from './isNumber';
import isTime from './isTime';
import isPercentage from './isPercentage';
import isVariable from './isVariable';

const operators = ['+', '-', '*', '/'];
// const operatorsRegexp = /[+\-\*\/]/g;

export default function (node) {

    if (
        !isFunction(node, 'calc')
        || !node.nodes
        || node.nodes.length === 0
    ) {
        return false;
    }
    let valid = true;
    let lastNonSpaceNode = false;

    walk(node.nodes, (child) => {

        // if an expression starts with operator
        if (!lastNonSpaceNode && ~operators.indexOf(child.value)) {
            valid = false;
        }

        // store last non space node
        if (child.type !== 'space') {
            lastNonSpaceNode = child;
        }

        if (
            child.type === 'function'
            && !isVariable(child)
        ) {
            if (child.value.length > 0) {
                valid = false;
            }
            if (child.nodes.length === 0 || !child.nodes) {
                valid = false;
            }
        }

        // invalidate any invalid word node
        if (child.type === 'word'
            && !isAngle(child)
            && !isLength(child)
            && !isTime(child)
            && !isInteger(child)
            // && !isNumber(child)
            && !isPercentage(child)
            && operators.indexOf(child.value) < 0
            ) {
            // + and - must be surrounded by spaces
            if (child.value.indexOf('+') > 0 || child.value.indexOf('-') > 0) {

                valid = false;
            }
            // unknown word node w/o operators is invalid
            if (operators.indexOf(child.value[child.value.length-1] >= 0)) {
                valid = false;
            }
        }
    });

    // if an expression ends with operator
    if (~operators.indexOf(lastNonSpaceNode.value)) {
        valid = false;
    }

    return valid;
}

export const type = 'node';
