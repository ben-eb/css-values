import {resolve} from 'path';
import camelCase from 'camelcase';
import nanoEqual from 'nano-equal';
import rename from 'gulp-rename';
import File from 'vinyl';
import vfs from 'vinyl-fs';
import map from 'map-stream';
import * as generator from './generators/index';
import * as log from './loggers/html';
import dataValidator from './util/dataValidator';
import formatGroup from './util/formatGroup';
import handleError from './util/handleError';
import writeBundle from './util/writeBundle';
import {properties} from './data';
import Parser from './parser';
import prefixer from './prefixer';
import * as validators from './validators/index';

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

/*
 * This is a temporary function to be removed
 * once generation of all functions has been
 * achieved.
 */

function known (parsed) {
    return parsed.every(node => {
        return node.type === 'keyword' ||
        node.type === 'string' ||
        node.type === 'group' && !node.order && !node.min && node.values.every(n => n.type === 'keyword') ||
        (node.type === 'data' && validators[dataValidator(node.value)]); // eslint-disable-line
    });
}

function getExclusives (parsed) {
    return parsed.reduce((list, node) => {
        if (node.type === 'keyword') {
            list.push(node.value);
        }
        if (node.type === 'group') {
            node.values.forEach(({value}) => list.push(value));
        }
        return list;
    }, []);
}

let promises = [];

properties.forEach(property => {
    let parsed = new Parser(property.syntax);
    if (parsed.length === 1 && parsed[0].type === 'property') {
        const {syntax} = properties.filter(prop => prop.name === parsed[0].value)[0];
        parsed = new Parser(syntax);
    }
    let hasUnknown = !known(parsed);
    if (hasUnknown) {
        log.fail(property.name, property.syntax, parsed);
        return;
    }
    log.pass(property.name, property.syntax, parsed);
    let group = property.groups.map(formatGroup)[0];
    let promise = prefixer({
        property: property.name,
        values: getExclusives(parsed),
    })
        .then(results => {
            if (!Object.keys(results).length) {
                results[property.name] = [];
            }
            let merged = mergeProperties(results);
            let config = [];
            merged.forEach(merge => {
                // Assume the specification property is on the bottom of the array
                let identifier = camelCase(merge.properties.slice(0).reverse()[0]) + 'Validator';

                let candidates = merge.values.reduce((list, value) => {
                    if (list.some(p => p.type === 'keyword' && p.value === value)) {
                        return list;
                    }
                    list.push({type: 'keyword', value});
                    return list;
                }, parsed.slice(0));

                // The all property is already covered by the global
                // validator, so it's not necessary to generate a validator
                // or tests for it.
                if (identifier === 'all') {
                    return;
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
        candidates: a.candidates,
    }, {
        candidates: b.candidates,
    });
}

function renamer (path) {
    path.dirname = path.dirname.replace('src', 'packages/css-values');
}

Promise.all(promises).then((configs) => {
    const fileSystem = [];
    const testFiles = [];
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
    const validatorConfig = Object.keys(outputs).reduce((conf, output) => {
        return [
            ...conf,
            outputs[output],
        ];
    }, []);

    fileSystem.push(new File({
        path: resolve(`packages/css-values/index.js`),
        contents: new Buffer(generator.property(validatorConfig)),
    }));

    testFiles.push(new File({
        path: resolve(`packages/css-values/test.js`),
        contents: new Buffer(generator.test(validatorConfig)),
    }));

    const stream = vfs.src('./src/validators/**/*.js', {base: process.cwd()})
        .pipe(rename(renamer))
        .pipe(map((file, cb) => {
            fileSystem.push(file);
            cb(null, file);
        }));

    stream.on('close', () => {
        return writeBundle({
            entry: './packages/css-values/index.js',
            dest: './packages/css-values/index.js',
            files: fileSystem,
        }).then(() => {
            const testStream = vfs.src('./src/util/**/*.js', {base: process.cwd()})
                .pipe(rename(renamer))
                .pipe(map((file, cb) => {
                    testFiles.push(file);
                    cb(null, file);
                }));

            testStream.on('close', () => {
                return writeBundle({
                    entry: './packages/css-values/test.js',
                    dest: './packages/css-values/test.js',
                    files: testFiles,
                    external: [
                        resolve('./packages/css-values/index.js'),
                    ],
                }).catch(handleError);
            });
        }).catch(handleError);
    });
}).catch(handleError);
