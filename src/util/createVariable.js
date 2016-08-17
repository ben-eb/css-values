import * as t from 'babel-types';

function createVariableFactory (type) {
    return function createVariable (...args) {
        return t.variableDeclaration(type, [
            t.variableDeclarator(...args),
        ]);
    };
}

export const createConst = createVariableFactory('const');
export const createLet = createVariableFactory('let');
