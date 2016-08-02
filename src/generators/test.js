import * as t from 'babel-types';
import flatten from 'flatten';
import template from '../util/moduleTemplate';
import generateProgram from './program';

export default opts => {
    let tests = (prop, valid) => {
        return value => {
            return t.objectExpression([
                t.objectProperty(
                    t.identifier('fixture'),
                    t.stringLiteral(`${prop}: ${value}`)
                ),
                t.objectProperty(
                    t.identifier('valid'),
                    t.identifier(valid ? 'true' : 'false')
                ),
            ]);
        };
    };

    return generateProgram([
        template('module.exports = EXPORTS;')({
            EXPORTS: t.arrayExpression(flatten(opts.properties.map(prop => {
                const valid   = opts.valid.map(tests(prop, true));
                const invalid = opts.invalid.map(tests(prop, false));
                return valid.concat(invalid);
            }))),
        }),
    ]);
};
