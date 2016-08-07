import toWord from '../util/toWord';
import {fixtures as ciFixtures, nodes as ciNodes} from './customIdent';

export const fixtures = {
    valid: [
        ...ciFixtures.valid,
        'NONE',
    ],
    invalid: ciFixtures.invalid,
};

export const nodes = {
    valid: [
        ...ciNodes.valid,
        toWord('NONE'),
    ],
    invalid: ciNodes.invalid,
};
