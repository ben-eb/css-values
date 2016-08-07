import createCaseInsensitiveTest from './createCaseInsensitiveTest';
import globalKeywords from './globals';

export default function globalTests (property) {
    return globalKeywords.reduce((list, value) => {
        return [
            ...list,
            ...createCaseInsensitiveTest(property, value),
        ];
    }, [{
        property,
        value: "var(--foo)",
        valid: true,
    }, {
        property,
        value: "VAR(--foo)",
        valid: true,
    }]);
}
