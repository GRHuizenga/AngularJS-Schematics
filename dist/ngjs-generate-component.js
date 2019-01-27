#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const env_dte_1 = require("./lib/env.dte");
const file_1 = require("./lib/file");
const underscore_1 = require("./lib/underscore");
const templatesPath = `../assets/templates`;
const templateFiles = [`component.html`, `component.ts`];
program
    .option('-p, --path <path>', 'Path to the folder in which to create the component, relative from solution root.')
    .option('-f, --folder', 'Create component folder. Default false.')
    .parse(process.argv);
const args = program.args;
if (!args.length) {
    console.log('');
    console.log(`Missing required argument: component name`);
    console.log('Usage: ngjs generate component <name> --path <path> --folder');
    process.exit(1);
}
const pathString = program.path.replace(String.fromCharCode(92), '/');
const folder = !!program.folder;
const generateComponent = () => {
    let dirToAdd = '';
    if (folder && !file_1.isDirectory(`./${pathString}/${args[0]}`)) {
        dirToAdd = `./${pathString}/${args[0]}`;
        file_1.mkDir(dirToAdd);
    }
    const filesToAdd = [];
    templateFiles.forEach((file) => {
        const templateData = file_1.readFile(`${templatesPath}/${file}`);
        const templateString = underscore_1.replaceParameters(templateData, { ComponentName: args[0] });
        const filePath = `./${pathString}${folder ? `/${args[0]}` : ''}/${file}`;
        filesToAdd.push(filePath);
        file_1.writeFile(filePath, templateString);
    });
    env_dte_1.addFilesToSolution(filesToAdd, dirToAdd);
};
generateComponent();
//# sourceMappingURL=ngjs-generate-component.js.map