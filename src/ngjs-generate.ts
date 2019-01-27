#!/usr/bin/env node

import * as program from 'commander';

program
  .command('component', 'Generate an AngularJS component')
  .alias('c')
  .parse(process.argv);