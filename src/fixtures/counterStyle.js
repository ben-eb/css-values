import {valid, symbolTypes} from '../validators/isCounterStyle';
import customIdent from './customIdent';

export default {
    valid: [
        ...customIdent.valid,
        ...valid,
        'symbols("*" "\\2020" "\\2021" "\\A7")',
        'symbols(url(cat.jpg))',
        'symbols(cyclic url(cat.jpg))',
        ...symbolTypes.map(v => `symbols(${v} "*" "\\2020" "\\2021" "\\A7")`),
    ],
    invalid: [
        ...customIdent.invalid.filter(v => v !== '"foobar"'),
        'symbols(foobar)',
    ],
};
