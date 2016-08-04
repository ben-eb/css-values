export const attachments = [
    'scroll',
    'fixed',
    'local',
];

export default ({type, value}) => {
    return type === 'word' && ~attachments.indexOf(value);
};
