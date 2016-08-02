import * as t from 'babel-types';
import template from '../util/moduleTemplate';

export default ({identifier, exported}) => {
    return template('export const foo = bar;')({
        foo: t.identifier(identifier),
        bar: exported,
    });
};
