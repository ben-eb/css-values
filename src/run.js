import mkdirp from 'mkdirp-promise';
import camelCase from 'camelcase';
import fs from 'fs';
import nanoEqual from 'nano-equal';
import ncp from 'ncp';
import {join} from 'path';
import * as generator from './generators/index';
import * as log from './loggers/console';
import formatGroup from './util/formatGroup';
import globals from './util/globals';
import {properties} from './data';
import Parser from './parser';
import prefixer from './prefixer';
import * as fixtures from './fixtures';

let files = 0;

function mergeProperties (data) {
    return Object.keys(data).reduce((list, key) => {
        let values = data[key];
        if (!list.length) {
            list.push({
                properties: [key],
                values: values
            });
        } else {
            let copy = list.filter(property => {
                return nanoEqual(property.values, values);
            });
            if (copy[0]) {
                copy[0].properties.push(key);
            } else {
                list.push({
                    properties: [key],
                    values: values
                });
            }
        }
        return list;
    }, []);
}

function known (parsed) {
    return parsed.nodes.every(node => {
        if (node.nodes) {
            return known(node);
        } else {
            return (node.type === 'keyword' && node.exclusive) ||
                (node.type === 'data' && node.value === 'length') ||
                (node.type === 'data' && node.value === 'integer') ||
                (node.type === 'data' && node.value === 'percentage') ||
                (node.type === 'data' && node.value === 'number') ||
                (node.type === 'data' && node.value === 'time') ||
                (node.type === 'data' && node.value === 'string');
        }
    });
}

function getExclusives (parsed) {
    return parsed.nodes.reduce((list, node) => {
        if (node.nodes) {
            list = list.concat(getExclusives(node));
        } else if (node.exclusive && node.type === 'keyword') {
            list.push(node.value);
        }
        return list;
    }, []);
}

function hasDataValue (value) {
    return function hasValue (parsed) {
        return parsed.nodes.some(node => {
            if (node.type === 'function') {
                return false;
            }
            if (node.type === 'data' && node.value === value) {
                return true;
            }
            if (node.nodes) {
                return hasValue(node);
            }
        });
    };
}

let hasLength = hasDataValue('length');
let hasInteger = hasDataValue('integer');
let hasPercentage = hasDataValue('percentage');
let hasNumber = hasDataValue('number');
let hasTime = hasDataValue('time');
let hasString = hasDataValue('string');

function getRepeat (parsed) {
    let repeat;
    parsed.nodes.some(node => {
        if (typeof node.repeat !== 'undefined') {
            repeat = node.repeat;
            return repeat;
        }
        if (node.nodes) {
            return getRepeat(node);
        }
    });
    return repeat;
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
                values: getExclusives(parsed)
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

                config.push({
                    identifier,
                    group,
                    properties: merge.properties,
                    values: merge.values,
                    repeat: getRepeat(parsed),
                    length: hasLength(parsed),
                    integer: hasInteger(parsed),
                    percentage: hasPercentage(parsed),
                    number: hasNumber(parsed),
                    time: hasTime(parsed),
                    string: hasString(parsed),
                    count: 1
                });

                let test = fs.createWriteStream(`output/tests/${group}/${identifier}.js`);

                files ++;

                let opts = {
                    properties: merge.properties,
                    valid: merge.values.concat(globals),
                    invalid: []
                };

                if (hasInteger(parsed)) {
                    opts.valid = opts.valid.concat(fixtures.integer.valid);
                    opts.invalid = opts.invalid.concat(fixtures.integer.invalid);
                }

                if (hasNumber(parsed)) {
                    opts.valid = opts.valid.concat(fixtures.number.valid);
                    opts.invalid = opts.invalid.concat(fixtures.number.invalid);
                }

                if (hasPercentage(parsed)) {
                    opts.valid = opts.valid.concat(fixtures.percentage.valid);
                    opts.invalid = opts.invalid.concat(fixtures.percentage.invalid);
                }

                if (hasLength(parsed)) {
                    opts.valid = opts.valid.concat(fixtures.length.valid);
                    opts.invalid = opts.invalid.concat(fixtures.length.invalid);
                }

                if (hasTime(parsed)) {
                    opts.valid = opts.valid.concat(fixtures.time.valid);
                    opts.invalid = opts.invalid.concat(fixtures.time.invalid);
                }

                test.write(generator.test(opts));

                test.end();
            });
            
            return config;
        })
        .catch(err => console.log(err));

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
        files ++;
        const config = outputs[output];
        imported.push({
            identifier: config.identifier,
            module: `./${config.group}/${config.identifier}`
        });

        exported.push(config.identifier);

        let script = fs.createWriteStream(`output/properties/${config.group}/${config.identifier}.js`);

        script.write(generator.property(config));
        script.end();
    });
    let contents = generator.program([
        generator.requireModules.apply(null, imported),
        generator.exportModules(exported)
    ]);
    let index = fs.createWriteStream(`output/properties/index.js`);
    index.write(contents);
    index.end();
    let index2 = fs.createWriteStream(`output/tests/index.js`);
    index2.write(contents);
    index2.end();
    let plugin = fs.createWriteStream(`output/plugin.js`);
    plugin.write(generator.plugin());
    plugin.end();
    let test = fs.createWriteStream(`output/test.js`);
    test.write(generator.tests());
    test.end();
    log.total(files + 4);
    ncp(join(__dirname, './validators'), join(__dirname, '../output/validators'), err => {
        if (err) {
            return console.error(err);
        }
        console.log('\nDone.');
    });
}).catch(err => console.log(err));
