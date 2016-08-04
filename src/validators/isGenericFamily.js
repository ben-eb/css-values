export const genericFamilies = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
];

export default ({type, value}) => {
    return type === 'word' && ~genericFamilies.indexOf(value);
};
