#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
program
    .command('component', 'Generate an AngularJS component')
    .alias('c')
    .parse(process.argv);
//# sourceMappingURL=ngjs-generate.js.map