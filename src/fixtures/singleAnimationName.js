import toWord from '../util/toWord';
import {fixtures as ciFixtures, nodes as ciNodes} from './customIdent';

export const fixtures = {
    valid: [
        ...ciFixtures.valid,
        'none',
        'NONE',
    ],
    invalid: ciFixtures.invalid,
};

export const nodes = {
    valid: [
        ...ciNodes.valid,
        toWord('none'),
        toWord('NONE'),
    ],
    invalid: ciNodes.invalid,
};
