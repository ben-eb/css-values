export default ({type, value}) => {
    if (type !== 'word') {
        return false;
    }
    if (value[0] === '-') {
        if (/[0-9]/.test(value[1])) {
            return false;
        }
        if (value[1] === '-' && value[2] !== '-') {
            return false;
        }
        return true;
    }
    return !/[0-9]/.test(value[0]);
};
