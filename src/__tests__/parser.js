import {inspect} from 'util';
import test from 'ava';
import Parser from '../parser';
import * as fixtures from './fixtures';

const macro = (t, syntax, ast, debug) => {
    const result = new Parser(syntax);
    if (debug) {
        console.log(inspect(result, false, null));
    }
    t.deepEqual(result, ast);
};

Object.keys(fixtures).forEach(key => {
    const {syntax, ast, debug} = fixtures[key];
    if (debug) {
        return test.only(key, macro, syntax, ast, debug);
    }
    test(key, macro, syntax, ast);
});
