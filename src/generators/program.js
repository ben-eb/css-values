import generate from 'babel-generator';
import traverse from 'babel-traverse';
import {program} from 'babel-types';
import flatten from 'flatten';

export default contents => {
    let script = program(flatten(contents));

    traverse(script, {
        noScope: true,
        EmptyStatement: path => path.remove(),
    });

    return generate(script).code + '\n';
};
