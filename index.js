const _ = require('lodash');
const chalk = require('chalk');
const table = require('text-table');

function report(results) {
    if (!results.length) { console.log(reportSuccess()); return; }

    const grouped = _.groupBy(results, 'fullPath');
    const output = _.map(grouped, reportFile).join('\n');

    console.log(output);
}

function reportFile(results, file) {
    return [
        '',
        chalk.underline(file),
        table(_.map(results, reportError), {
            align: ['', 'r', 'l', 'l', 'r'],
            stringLength: (str) => chalk.stripColor(str).length
        }),
        ''
    ].join('\n');
}

function reportError(error) {
    return [
        '',
        chalk.dim(`${error.line}:${error.column}`),
        error.severity === 'error' ? chalk.red(error.severity) : chalk.yellow(error.severity),
        error.message,
        chalk.dim(error.linter)
    ];
}

function reportSuccess() {
  return [
    '',
    chalk.green("All rules passed. Your code simply rocks!"),
    ''
  ].join('\n');
}

module.exports = {
    report: report
};
