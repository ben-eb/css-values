import {properties} from './data';
import Parser from './parser';
import chalk from 'chalk';
import mkdirp from 'mkdirp';
import camelCase from 'camelcase';
import fs from 'fs';
import * as generator from './generator';
import prefixer from './prefixer';
import ncp from 'ncp';
import path from 'path';
import * as fixtures from './fixtures';
import percentage from './util/percentage';
import arrayEqual from './util/arrayEqual';
import globals from './util/globals';

let stats = {
    parsed: 0,
    count: 0
};

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
                return arrayEqual(property.values, values);
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
let imported = '';
let exported = [];

properties.forEach(property => {
    stats.count ++;
    let parsed = new Parser(property.syntax);
    let hasUnknown = !known(parsed);
    if (hasUnknown) {
        console.log(`${chalk.red(property.name)}: ${property.syntax}`);
        return;
    }
    console.log(`${chalk.green(property.name)}: ${chalk.grey(property.syntax)}`);
    stats.parsed ++;
    let group = property.groups.map(g => {
        return camelCase(g.replace('CSS', '').trim());
    })[0];
    let promise = new Promise((resolve, reject) => {
        return mkdirp(`output/properties/${group}`, err => {
            if (err) {
                return reject(err);
            }
            return mkdirp(`output/tests/${group}`, err2 => {
                if (err2) {
                    return reject(err2);
                }
                return prefixer(property.name, getExclusives(parsed)).then(results => {
                    if (!Object.keys(results).length) {
                        results[property.name] = [];
                    }
                    let merged = mergeProperties(results);
                    merged.forEach(merge => {
                        // Assume the specification property is on the bottom of the array
                        let propName = camelCase(merge.properties.slice(0).reverse()[0]);
                        
                        imported += generator.requireModule({
                            identifier: propName,
                            module: `./${group}/${propName}`
                        });

                        exported.push(propName);

                        let script = fs.createWriteStream(`output/properties/${group}/${propName}.js`);

                        script.write(generator.property({
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
                        }));

                        script.write('\n');
                        script.end();

                        let test = fs.createWriteStream(`output/tests/${group}/${propName}.js`);

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

                        test.write('\n');
                        test.end();
                    });

                    resolve();
                });
            });
        });
    });

    promises.push(promise);
});

Promise.all(promises).then(() => {
    let index = fs.createWriteStream(`output/properties/index.js`);
    index.write(generator.warning() + imported + '\n\n' + generator.exportModules(exported));
    index.end();
    let index2 = fs.createWriteStream(`output/tests/index.js`);
    index2.write(generator.warning() + imported + '\n\n' + generator.exportModules(exported));
    index2.end();
    let plugin = fs.createWriteStream(`output/plugin.js`);
    plugin.write(generator.plugin());
    plugin.end();
    let test = fs.createWriteStream(`output/test.js`);
    test.write(generator.tests());
    test.end();
    console.log(`\n  Parsed: ${chalk.green(stats.parsed)} (${percentage(stats.parsed, stats.count)}%)`);
    console.log(`   Total: ${stats.count}`);
    ncp(path.join(__dirname, './validators'), path.join(__dirname, '../output/validators'), err => {
        if (err) {
            return console.error(err);
        }
        console.log('\nDone.');
    });
}).catch(err => console.log(err));
