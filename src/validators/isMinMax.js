import {keywords} from './isTrackSize';
import isLengthPercentage from './isLengthPercentage';
import isKeyword from './isKeyword';
import isFunction from './isFunction';
import isFlex from './isFlex';
import isComma from './isComma';

export default (node) => {
    if (isFunction(node, 'minmax') && node.nodes.length === 3) {
        
        let firstChild = node.nodes[0];
        let secondChild = node.nodes[1];
        let thirdChild = node.nodes[2];

        if (!isKeyword(firstChild, keywords)
            && !isLengthPercentage(firstChild)) {
            return false;
        }

        if (!isComma(secondChild)) {
            return false;
        }

        if (!isKeyword(thirdChild, keywords)
            && !isLengthPercentage(thirdChild)
            && !isFlex(thirdChild)) {
            return false;
        }

        return true;
    }

    return false;
};
