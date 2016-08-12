import isKeyword from './isKeyword';
import isCustomIdent from './isCustomIdent';

export const animateableFeatures = [
    'scroll-position',
    'contents',
];

export default node => {
    return  isKeyword(node, animateableFeatures) || isCustomIdent(node);
};

export const type = 'node';
