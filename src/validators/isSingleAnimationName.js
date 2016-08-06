import isCustomIdent from './isCustomIdent';

export default node => {
    return node.type === 'word' && (node.value.toLowerCase() === 'none' || isCustomIdent(node));
};

export const type = 'node';
