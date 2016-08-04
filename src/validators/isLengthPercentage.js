import isLength from './isLength';
import isPercentage from './isPercentage';

export default node => {
    return isLength(node) || isPercentage(node);
};

export const type = 'node';
