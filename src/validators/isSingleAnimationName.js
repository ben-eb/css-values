import isCustomIdent from './isCustomIdent';

export default node => {
    return node.type === 'word' && (isCustomIdent(node) || node.value === 'none');
};

export const type = 'node';
