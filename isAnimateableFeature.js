import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
import isCustomIdent from './isCustomIdent';

export const animateableFeatures = [
    'scroll-position',
    'contents',
];

export default node => {
    return  isCaseInsensitiveKeyword(node, animateableFeatures) || isCustomIdent(node);
};

export const type = 'node';
