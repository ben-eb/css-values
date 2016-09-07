import * as t from 'babel-types';
import {createConst} from '../util/createVariable';

/**
 * Get an object of property validators, keyed by property name.
 *
 * @param  {array} config An array of property/value candidates
 * @return {Babel}        The object of property validators
 * @example
 * generateValidatorMap(config);
 * //=> {"appearance": appearanceValidator, ...}
 */

export default function generateValidatorMap (config) {
    const validatorMap = config.reduce((map, {identifier, properties}) => {
        properties.forEach(property => {
            if (map[property]) {
                return;
            }
            map[property] = identifier;
        });
        return map;
    }, {});
    return createConst(
        t.identifier('validators'),
        t.objectExpression(Object.keys(validatorMap).sort().map(key => {
            return t.objectProperty(
                t.stringLiteral(key),
                t.identifier(validatorMap[key])
            );
        }))
    );
}
