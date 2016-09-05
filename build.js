const execa = require('execa');
const Listr = require('listr');

const run = script => ['run', script];

const tasks = new Listr([{
    title: 'Transpiling generators',
    task: () => execa('npm', run('prepublish')),
}, {
    title: 'Generating module',
    task: () => execa('npm', run('generate')),
}, {
    title: 'Running tests',
    task: () => execa('npm', ['test']),
}, {
    title: 'Generating coverage report',
    task: () => execa('npm', run('report')),
}, {
    title: 'Updating docs',
    task: () => execa('npm', run('docs')),
}, {
    title: 'Updating readme',
    task: () => execa('npm', run('markdown')),
}]);

tasks.run();
