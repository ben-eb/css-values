import template from 'babel-template';
import * as t from 'babel-types';

export default exported => {
    const exportTemplate = template('module.exports = EXPORTS');

    return exportTemplate({
        EXPORTS: t.arrayExpression(exported.map((value, index) => {
            if (index === exported.length - 1) {
                return t.identifier(`\n    ${value}\n`);
            }
            return t.identifier(`\n    ${value}`);
        }))
    });
};
