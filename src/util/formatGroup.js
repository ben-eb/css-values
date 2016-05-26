import camelCase from 'camelcase';

export default function formatGroup (group) {
    return camelCase(group.replace('CSS', '').trim());
}
