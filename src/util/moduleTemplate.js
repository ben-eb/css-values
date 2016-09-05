import template from 'babel-template';

export default (str, opts = {}) => {
    return template(str, {
        ...opts,
        sourceType: 'module',
    });
};
