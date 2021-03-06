import * as t from 'babel-types';

export default (...modules) => {
    return modules.map(opts => {
        return t.importDeclaration(
            [t.importDefaultSpecifier(t.identifier(opts.identifier))],
            t.stringLiteral(opts.module)
        );
    });
};
