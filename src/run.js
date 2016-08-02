import fs from 'fs';
import {join} from 'path';
import mkdirp from 'mkdirp-promise';
import camelCase from 'camelcase';
import nanoEqual from 'nano-equal';
import ncp from 'ncp';
import * as generator from './generators/index';
import * as log from './loggers/html';
import capitalise from './util/capitalise';
import formatGroup from './util/formatGroup';
import handleError from './util/handleError';
import {properties} from './data';
import Parser from './parser';
import prefixer from './prefixer';
import validators from './validators';

let files = 0;

function mergeProperties (data) {
    return Object.keys(data).reduce((list, key) => {
        let values = data[key];
        if (!list.length) {
            list.push({
                properties: [key],
                values,
            });
        } else {
            const copy = list.filter(prop => nanoEqual(prop.values, values));
            if (copy[0]) {
                copy[0].properties.push(key);
            } else {
                list.push({
                    properties: [key],
                    values,
                });
            }
        }
        return list;
    }, []);
}

/**
 * This is a temporary function to be removed
 * once generation of all functions has been
 * achieved.
 */

function known (parsed) {
    return parsed.every(node => {
        return node.type === 'keyword' ||
        (node.type === 'data' && ~validators.indexOf(`is${capitalise(camelCase(node.value))}`));
    });
}

function getExclusives (parsed) {
    return parsed.reduce((list, node) => {
        if (node.type === 'keyword') {
            list.push(node.value);
        }
        return list;
    }, []);
}

let promises = [];
let imported = [];
let exported = [];

properties.forEach(property => {
    let parsed = new Parser(property.syntax);
    let hasUnknown = !known(parsed);
    if (hasUnknown) {
        log.fail(property.name, property.syntax, parsed);
        return;
    }
    log.pass(property.name, property.syntax, parsed);
    let group = property.groups.map(formatGroup)[0];
    let promise = mkdirp(`output/properties/${group}`)
        .then(mkdirp(`output/tests/${group}`))
        .then(() => {
            return {
                property: property.name,
                values: getExclusives(parsed),
            };
        })
        .then(prefixer)
        .then(results => {
            if (!Object.keys(results).length) {
                results[property.name] = [];
            }
            let merged = mergeProperties(results);
            let config = [];
            merged.forEach(merge => {
                // Assume the specification property is on the bottom of the array
                let identifier = camelCase(merge.properties.slice(0).reverse()[0]);

                let candidates = merge.values.reduce((list, value) => {
                    if (list.some(p => p.type === 'keyword' && p.value === value)) {
                        return list;
                    }
                    list.push({type: 'keyword', value});
                    return list;
                }, parsed.slice(0));

                // The all property is already covered by the global
                // validator, but this is important to still generate
                // a CSS custom property validator for it.
                if (identifier === 'all') {
                    candidates = [];
                }

                config.push({
                    identifier,
                    group,
                    properties: merge.properties,
                    candidates,
                });
            });

            return config;
        })
        .catch(handleError);

    promises.push(promise);
});

function canMergeValidators (a, b) {
    return nanoEqual({
        ...a,
        properties: null,
        identifier: null,
        group: null,
    }, {
        ...b,
        properties: null,
        identifier: null,
        group: null,
    });
}

Promise.all(promises).then((configs) => {
    const outputs = configs.reduce((list, configArray) => {
        configArray.forEach(config => {
            const canMerge = Object.keys(list).some(key => {
                const value = list[key];
                if (canMergeValidators(value, config)) {
                    list[key].properties = [
                        ...value.properties,
                        ...config.properties,
                    ];
                    return true;
                }
                return false;
            });
            if (!canMerge) {
                list[config.identifier] = config;
            }
        });
        return list;
    }, {});
    Object.keys(outputs).forEach(output => {
        files += 2;
        const config = outputs[output];
        imported.push({
            identifier: config.identifier,
            module: `./${config.group}/${config.identifier}`,
        });

        exported.push(config.identifier);

        let script = fs.createWriteStream(`output/properties/${config.group}/${config.identifier}.js`);

        script.write(generator.property(config));
        script.end();

        let test = fs.createWriteStream(`output/tests/${config.group}/${config.identifier}.js`);

        test.write(generator.test(config));
        test.end();
    });
    let contents = generator.program([
        generator.requireNamespacedModules(...imported),
        generator.exportModules(exported),
    ]);
    let testContents = generator.program([
        generator.requireModules(...imported),
        generator.exportModules(exported),
    ]);
    let index = fs.createWriteStream(`output/properties/index.js`);
    index.write(contents);
    index.end();
    let index2 = fs.createWriteStream(`output/tests/index.js`);
    index2.write(testContents);
    index2.end();
    let plugin = fs.createWriteStream(`output/plugin.js`);
    plugin.write(generator.plugin());
    plugin.end();
    let test = fs.createWriteStream(`output/test.js`);
    test.write(generator.tests());
    test.end();
    log.total(files + 4);
    ncp(join(__dirname, '../src/validators'), join(__dirname, '../output/validators'), err => {
        if (err) {
            return handleError(err);
        }
        console.log('\nDone.');
    });
}).catch(handleError);
