function lowercase (value) {
    return value.toLowerCase();
}

export default function isKeyword ({type, value}, values) {
    return type === 'word' && ~values.map(lowercase).indexOf(lowercase(value));
}
