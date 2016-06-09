export default function singleValue (candidates) {
    return candidates.every(c => c.type !== 'multiple');
}
