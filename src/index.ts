#!/usr/bin/env node

import * as program from 'commander';
import * as generate from './commands/generate';

program
  .command('rm <dir>')
  .option('-r, --recursive', 'Remove recursively')
  .action((dir: string, options) => {
    console.log(`type of options: ${typeof options}`);
    generate.clog(dir, options.recursive);
  });

program.parse(process.argv);

// const script: string = 'C:\\tools\\angularjs-schematics\\assets\\AddFilesToSolution.ps1';
// const solution: string = `C:\\TFS\\CC\\CCI\\DEV\\DEV_FIN\\Source\\Web Applications\\WebApplications.sln`;
// const project: string = `Sigmax.CityControl.Web`;
// const items: string[] = [`C:\\TFS\\CC\\CCI\\DEV\\DEV_FIN\\Source\\Web Applications\\Sigmax.CityControl.Web\\test.txt`];

// exec('echo shelljs.exec works!');
// exec(`powershell -File ${script} -solutionPath "${solution}" -projectName "${project}" -item "${items.join(',')}"`);
