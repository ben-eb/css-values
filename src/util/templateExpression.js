import template from './moduleTemplate';

export default function templateExpression (tmpl, opts = {}) {
    return template(tmpl)(opts).expression;
}
