"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const scriptPath = './assets/AddFilesToSolution.ps1';
const cwd = process.cwd().replace(/\\/, '/').replace(String.fromCharCode(92), '/');
const solution = `${cwd}/../WebApplications.sln`;
const project = `Sigmax.CityControl.Web`;
exports.addFilesToSolution = (filesToAdd, dirToAdd) => {
    shelljs_1.exec(`powershell -File ${scriptPath} -solutionPath "${solution}" -projectName "${project}" -item "${filesToAdd.join(',')}" -folder "${dirToAdd}"`);
};
//# sourceMappingURL=env.dte.js.map