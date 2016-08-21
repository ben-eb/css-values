import isKeyword from './isKeyword';
import isNumber from './isNumber';

export const value = ['infinite'];

export default node => {
    return  isKeyword(node, value) || isNumber(node);
};
