export default function arrayEqual (a, b) {
    if (a.length === b.length) {
        return a.every((value, index) => {
            return value === b[index];
        });
    }
    
    return false;
}
