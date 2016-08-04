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

export default ({type, value}) => {
    return type === 'word' && ~compositeStyles.indexOf(value);
};
