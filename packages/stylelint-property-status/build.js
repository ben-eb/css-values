const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const properties = require('../../dist/data').properties;

const pipe = postcss([ autoprefixer({browsers: '> 0%'}) ]);

const data = properties.reduce((list, property) => {
    if (!list[property.name]) {
        list[property.name] = property.status;
    }

    pipe.process(`${property.name}: initial;`).root.nodes.forEach(node => {
        if (!list[node.prop]) {
            list[node.prop] = 'nonstandard';
        }
    });

    return list;
}, {});

process.stdout.write(JSON.stringify(data, null, 2) + '\n');
