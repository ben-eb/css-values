export default function createCaseInsensitiveTest (property, value) {
    return [{
        property,
        value,
        valid: true,
    }, {
        property,
        value: value.toUpperCase(),
        valid: true,
    }];
}
