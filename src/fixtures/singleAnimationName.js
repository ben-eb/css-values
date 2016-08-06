import toWord from '../util/toWord';
import {fixtures as ciFixtures, nodes as ciNodes} from './customIdent';

export const fixtures = {
    valid: [
        ...ciFixtures.valid,
        'none',
    ],
    invalid: ciFixtures.invalid,
};

export const nodes = {
    valid: [
        ...ciNodes.valid,
        toWord('none'),
    ],
    invalid: ciNodes.invalid,
};
