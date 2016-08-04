export const attachments = [
    'scroll',
    'fixed',
    'local',
];

export default value => {
    return ~attachments.indexOf(value);
};
