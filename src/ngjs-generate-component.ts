#!/usr/bin/env node

import * as program from 'commander';
import { addFilesToSolution } from './lib/env.dte';
import { isDirectory, mkDir, readFile, writeFile } from './lib/file';
import { replaceParameters } from './lib/underscore';

const templatesPath: string = `../assets/templates`;
const templateFiles: string[] = [`component.html`, `component.ts`];

program
  .option('-p, --path <path>', 'Path to the folder in which to create the component, relative from solution root.')
  .option('-f, --folder', 'Create component folder. Default false.')
  .parse(process.argv);

const args: string[] = program.args;

if (!args.length) {
  console.log('');
  console.log(`Missing required argument: component name`);
  console.log('Usage: ngjs generate component <name> --path <path> --folder');
  process.exit(1);
}

const pathString: string = program.path.replace(String.fromCharCode(92), '/');
const folder: boolean = !!program.folder;

const generateComponent = (): void => {
  let dirToAdd: string = '';
  if (folder && !isDirectory(`./${pathString}/${args[0]}`)) {
    dirToAdd = `./${pathString}/${args[0]}`;
    mkDir(dirToAdd);
  }

  const filesToAdd: string[] = [];

  templateFiles.forEach((file: string) => {
    const templateData: string = readFile(`${templatesPath}/${file}`);
    const templateString: string = replaceParameters(templateData, { ComponentName: args[0] });

    const filePath: string = `./${pathString}${folder ? `/${args[0]}` : ''}/${file}`;
    filesToAdd.push(filePath);

    writeFile(filePath, templateString);
  });

  addFilesToSolution(filesToAdd, dirToAdd);
};

generateComponent();
