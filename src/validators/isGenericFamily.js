export const genericFamilies = [
    'serif',
    'sans-serif',
    'cursive',
    'fantasy',
    'monospace',
];

export default value => {
    return ~genericFamilies.indexOf(value);
};
