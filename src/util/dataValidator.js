import camelCase from 'camelcase';
import capitalise from './capitalise';

export default data => {
    return `is${capitalise(camelCase(data))}`;
};
