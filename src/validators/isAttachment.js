import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const attachments = [
    'scroll',
    'fixed',
    'local',
];

export default node => isCaseInsensitiveKeyword(node, attachments);

export const type = 'node';
