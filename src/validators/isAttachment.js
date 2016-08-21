import isKeyword from './isKeyword';

export const attachments = [
    'scroll',
    'fixed',
    'local',
];

export default node => isKeyword(node, attachments);
