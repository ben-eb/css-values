import * as t from 'babel-types';

function generateConditionsFactory (operator) {
    return function generateConditions (...conditions) {
        const {length} = conditions;
        if (length === 1) {
            return conditions[0];
        }
        return t.logicalExpression(
            operator,
            generateConditions(...conditions.slice(0, length - 1)),
            conditions[length - 1]
        );
    };
}

export const allTruthy = generateConditionsFactory('&&');
export const anyTruthy = generateConditionsFactory('||');

function generateIfFactory (builder) {
    return function generateIf (conditions, body) {
        return t.ifStatement(
            builder(...conditions),
            t.blockStatement(body)
        );
    };
}

export const ifAllTruthy = generateIfFactory(allTruthy);
export const ifAnyTruthy = generateIfFactory(anyTruthy);
