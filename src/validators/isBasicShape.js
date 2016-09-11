import {walk} from 'postcss-value-parser';
import isLengthPercentage from './isLengthPercentage';
import isFunction from './isFunction';
import isKeyword from './isKeyword';
import {isPositionNoRepeat} from './isPosition';
import isSpace from './isSpace';
import isAt from './isAt';
import isEven from './isEven';
import isComma from './isComma';

function isFillRule (node) {
    return isKeyword(node, ['nonzero', 'evenodd']);
}

function isShapeRadius (node) {
    return isLengthPercentage(node)
        || isKeyword(node, ['closest-side', 'farthest-side']);
}


export function isInset (node) {   
    if (!isFunction(node, 'inset')) {
        return false;
    }
    let valid = true;
    walk(node.nodes, (child, index) => {
        const even = isEven(index);
        if (!even && !isSpace(child)) {
            valid = false;
            return false;
        }
        if (even && !isLengthPercentage(child)) {
            valid = false;
            return false;
        }
    });
    return valid;
}

export function isCircle (node) {
    if (!isFunction(node, 'circle')) {
        return false;
    }
    let valid = true;
    let atIdx = 0;
    let skip = false;
    walk(node.nodes, (child, index) => {
        if (skip) {                
            return false;            
        }
        const even = isEven(index);        
        if (!even && !isSpace(child)) {
            valid = false;
            return false;
        }
        if (even) {            
            if (isAt(child)) {
                skip = true; 
                atIdx = index;              
                return false;
            }
            
            if (!isShapeRadius(child)) {
                valid = false;
                return false;
            }
        }        
    });
    if (skip && !isPositionNoRepeat({nodes:node.nodes.slice(atIdx + 2)})) {
        return false;
    };
    return valid;
}

export function isEllipse (node) {
    if (!isFunction(node, 'ellipse')) {
        return false;
    }    
    let valid = true;
    let atIdx = 0;
    let skip = false;
    let expectShapeRadius = false;
    walk(node.nodes, (child, index) => {
        if (skip) {                
            return false;            
        }
        if (index === 0) {
            if (isShapeRadius(child)) {
                expectShapeRadius = true;
            }
        };
        if (index === 2 && expectShapeRadius) {
            if (!isShapeRadius(child)) {
                valid = false;
                return false;
            } 
        };
        const even = isEven(index);
        if (!even && !isSpace(child)) {
            valid = false;
            return false;
        }
        if (even) {
            if (isAt(child)) {
                skip = true; 
                atIdx = index;
                return false;              
            }
        };        
    });
    if (skip && !isPositionNoRepeat({nodes:node.nodes.slice(atIdx + 2)})) {
        return false;
    };
    return valid;
}

export function isPolygon (node) {
    if (!isFunction(node, 'polygon')) {
        return false;
    }
    let valid = true;
    let commaIdx;
    walk(node.nodes, (child, index) => {
        if (index === node.nodes.length - 1) {
            if (!isComma(node.nodes[index - 3])) {
                valid = false;
                return false;
            };
        };
        if (index === 0) {
            if (isFillRule(child)) {
                commaIdx = 1;
                return false;
            } 
            if (isLengthPercentage(child)) {
                commaIdx = 3;
                return false;
            }
            valid = false;      
            return false;
        };
        if (index === commaIdx) {
            commaIdx += 4;
            if (!isComma(child)) {
                valid = false;
                return false;
            };
        } else {
            const even = isEven(index);
            if (even && !isLengthPercentage(child)) {
                valid = false;
                return false;
            }
            if (!even && !isSpace(child)) {
                valid = false;
                return false;
            }
        };
        
    });
    return valid;
}

export default (node) => {
    return isInset(node)
        || isCircle(node)
        || isEllipse(node)
        || isPolygon(node);
};
