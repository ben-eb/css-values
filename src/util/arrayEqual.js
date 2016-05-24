export default function arrayEqual (a, b) {
    if (a.length === b.length) {
        return a.every((value, index) => value === b[index]);
    }
    
    return false;
}
