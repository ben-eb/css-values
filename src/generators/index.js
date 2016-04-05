import generateExportModules from './exportModules';
import generatePlugin from './plugin';
import generateProgram from './program';
import generateProperty from './property';
import generateRequireModules from './requireModules';
import generateTest from './test';
import generateTests from './tests';

export let exportModules = generateExportModules;
export let plugin = generatePlugin;
export let program = generateProgram;
export let property = generateProperty;
export let requireModules = generateRequireModules;
export let test = generateTest;
export let tests = generateTests;
