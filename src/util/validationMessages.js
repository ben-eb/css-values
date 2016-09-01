export function invalidMessage (message) {
    return {
        type: 'invalid',
        message,
    };
}

export function unknownMessage (message) {
    return {
        type: 'unknown',
        message,
    };
}
