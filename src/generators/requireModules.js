import template from 'babel-template';
import * as t from 'babel-types';

export default (...modules) => {
    return modules.map(opts => {
        return template(`var IDENTIFIER = require(MODULE);`)({
            IDENTIFIER: t.identifier(opts.identifier),
            MODULE: t.stringLiteral(opts.module)
        });
    });
};
