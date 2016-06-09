import {arrayExpression, stringLiteral} from 'babel-types';

export default function arrayOfStrings (list) {
    return arrayExpression(list.map(item => stringLiteral(item)));
}
