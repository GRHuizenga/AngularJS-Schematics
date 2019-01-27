#!/usr/bin/env node

import chalk from 'chalk';
import * as clear from 'clear';
import * as program from 'commander';
import * as figlet from 'figlet';

clear();
console.log(chalk.green(figlet.textSync('AngularJS CLI', { horizontalLayout: 'full' })));

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