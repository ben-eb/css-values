import isLength from './isLength';
import isPercentage from './isPercentage';

export default num => {
    return isLength(num) || isPercentage(num);    
};
