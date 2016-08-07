import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';
import isCustomIdent from './isCustomIdent';

export const animatedFeatures = [
    'scroll-position',
    'contents',
];

export default node => {
return isCaseInsensitiveKeyword(node, animatedFeatures) || isCustomIdent(node);
};

export const type = 'node';
