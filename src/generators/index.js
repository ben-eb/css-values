import generateExportModules from './exportModules';
import generatePlugin from './plugin';
import generateProgram from './program';
import generateProperty from './property';
import generateRequireModules from './requireModules';
import generateTest from './test';
import generateTests from './tests';

export const exportModules = generateExportModules;
export const plugin = generatePlugin;
export const program = generateProgram;
export const property = generateProperty;
export const requireModules = generateRequireModules;
export const test = generateTest;
export const tests = generateTests;
