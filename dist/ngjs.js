#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const clear = require("clear");
const program = require("commander");
const figlet = require("figlet");
clear();
console.log(chalk_1.default.green(figlet.textSync('AngularJS CLI', { horizontalLayout: 'full' })));
program
    .version('0.1.0')
    .command('generate', 'Generate an item and add the files to the solution')
    .usage('[command] [sub-command] [options]')
    .alias('g');
program.on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  ngjs generate component SomeComponent --path /Views/Documents --no-folder');
    console.log('  ngjs g c SomeComponent -p /Views/Documents -F');
    console.log('  ngjs g --help');
});
program.parse(process.argv);
//# sourceMappingURL=ngjs.js.map