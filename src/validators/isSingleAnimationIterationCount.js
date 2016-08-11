import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
import isNumber from './isNumber';

export const value = ['infinite'];

export default node => {
    return  isCaseInsensitiveKeyword(node, value) || isNumber(node);
};

export const type = 'node';
