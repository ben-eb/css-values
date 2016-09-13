import stylelintTest from '../../src/util/stylelintTest';
import data from './data/data.json';
import propertyStatus, {ruleName} from './index';

function rejectedFixtureFactory (type) {
    return Object.keys(data).reduce((list, key) => {
        const status = data[key];
        if (status !== type) {
            return list;
        }
        return [
            ...list, {
                code: `${key}: initial;`,
                message: `Unexpected property "${key}" (${ruleName})`,
            },
        ];
    }, []);
}

const standard = Object.keys(data).reduce((list, key) => {
    const status = data[key];
    if (status !== 'standard') {
        return list;
    }
    return [
        ...list, {
            code: `${key}: initial;`,
        },
    ];
}, []);

const nonstandard = rejectedFixtureFactory('nonstandard');
const experimental = rejectedFixtureFactory('experimental');
const obsolete = rejectedFixtureFactory('obsolete');

const scssVar = [{
    code: `$scssVar: 10px`,
}];

stylelintTest(propertyStatus.rule, {
    ruleName,
    skipBasicChecks: true,

    reject: scssVar,
});

stylelintTest(propertyStatus.rule, {
    ruleName,
    skipBasicChecks: true,
    config: {
        scssCompatibility: true,
    },

    accept: scssVar,
});

stylelintTest(propertyStatus.rule, {
    ruleName,
    skipBasicChecks: true,

    accept: standard,
    reject: [
        ...nonstandard,
        ...experimental,
        ...obsolete,
    ],
});

stylelintTest(propertyStatus.rule, {
    ruleName,
    skipBasicChecks: true,
    config: {
        statuses: 'nonstandard',
    },

    accept: [
        ...nonstandard,
    ],
});

stylelintTest(propertyStatus.rule, {
    ruleName,
    skipBasicChecks: true,
    config: {
        statuses: ['experimental', 'obsolete'],
    },

    accept: [
        ...experimental,
        ...obsolete,
    ],
});
