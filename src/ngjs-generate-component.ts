#!/usr/bin/env node

import * as program from 'commander';
import * as fs from 'fs';
import { template } from 'underscore';

program
  .option('-p, --path <path>', 'Path where to put the files')
  .parse(process.argv);

const args: string[] = program.args;

if (!args.length) {
  console.log('');
  console.log(`Missing required argument: component name`);
  console.log('Usage: ngjs generate component <name> --path <path>');
  process.exit(1);
} else {
  console.log(`component: ${args[0]}`);
}

if (program.path) {
  console.log(`path: ${program.path}`);
}

const f = fs.readFileSync('./lib/templates/component', 'utf8');
const compiled = template(f)({ ComponentName: args[0] });
fs.writeFileSync('C:\\tools\\sample.ts', compiled);
