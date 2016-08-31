import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

const pipe = postcss([ autoprefixer({browsers: '> 0%'}) ]);

function handleResults (results) {
    return results.reduce((list, result) => {
        Object.keys(result).forEach(key => {
            if (!list[key]) {
                list[key] = [];
            }
            list[key] = list[key].concat(result[key]);
        });
        return list;
    }, {});
}

export default ({property, values}) => {
    let promises = values.reduce((properties, value) => {
        properties.push(pipe.process(`${property}:${value}`).then(result => {
            return result.root.nodes.reduce((list, node) => {
                // -moz-appearance has different semantics, so ignore it
                if (property === 'appearance' && node.prop === '-moz-appearance') {
                    return list;
                }
                if (!list[node.prop]) {
                    list[node.prop] = [];
                }
                list[node.prop].push(node.value);
                return list;
            }, {});
        }));
        return properties;
    }, []);

    return Promise.all(promises).then(handleResults);
};
