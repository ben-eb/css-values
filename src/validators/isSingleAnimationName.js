import isCustomIdent from './isCustomIdent';
import isKeyword from './isKeyword';

export default node => {
    return isKeyword(node, 'none') || isCustomIdent(node);
};
