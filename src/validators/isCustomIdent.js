function isInvalid (value) {
    return /[^a-z0-9_-]/ig.test(value);
}

function isCodepoint (value) {
    return /\\u[a-f0-9]{1,6}/ig.test(value) || /\\[a-f0-9]{1,6}/ig.test(value);
}

function isValid (value) {
    return !isInvalid(value) || isCodepoint(value);
}

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
        return isValid(value);
    }
    return !/[0-9]/.test(value[0]) && isValid(value);
};

export const type = 'node';
