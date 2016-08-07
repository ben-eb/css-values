import chalk from 'chalk';
import percentage from '../util/percentage';

const stats = {
    parsed: 0,
    count: 0,
};

export function pass (property, syntax /* , parsed */) {
    stats.parsed ++;
    stats.count ++;
    console.log(`${chalk.green(property)}: ${chalk.grey(syntax)}`);
}

export function fail (property, syntax /* , parsed */) {
    stats.count ++;
    console.log(`${chalk.red(property)}: ${syntax}`);
}

export function total () {
    console.log(`\n  Parsed: ${chalk.green(stats.parsed)} (${percentage(stats.parsed, stats.count)}%)`);
    console.log(`  Total: ${stats.count}`);
}
