import isCaseInsensitiveKeyword from './isCaseInsensitiveKeyword';

export const compositeStyles = [
    'clear',
    'copy',
    'source-over',
    'source-in',
    'source-out',
    'source-atop',
    'destination-over',
    'destination-in',
    'destination-out',
    'destination-atop',
    'xor',
];

export default node => isCaseInsensitiveKeyword(node, compositeStyles);

export const type = 'node';
