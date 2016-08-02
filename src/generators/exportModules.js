import * as t from 'babel-types';
import template from '../util/moduleTemplate';

export default exported => {
    const exportTemplate = template('export default EXPORTS;');

    return exportTemplate({
        EXPORTS: t.arrayExpression(exported.map(value => t.identifier(value))),
    });
};
