export const boxes = [
    'border-box',
    'padding-box',
    'content-box',
];

export default value => {
    return ~boxes.indexOf(value);
};
