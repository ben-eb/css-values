import test from 'ava';
import {createRuleTester} from 'stylelint';

export default createRuleTester((processCss, context) => {
    const testFn = (context.only) ? test.only : test;
    testFn(context.caseDescription, t => {
        return processCss.then(comparisons => {
            comparisons.forEach(({actual, expected, description}) => {
                t.is(actual, expected, description);
            });
        });
    });
});
