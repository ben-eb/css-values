import template from 'babel-template';

export default str => {
    return template(str, {sourceType: 'module'});
};
