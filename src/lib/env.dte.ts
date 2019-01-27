import { exec } from 'shelljs';

const scriptPath: string = './assets/AddFilesToSolution.ps1';
const cwd: string = process.cwd().replace(/\\/, '/').replace(String.fromCharCode(92), '/');
const solution: string = `${cwd}/../WebApplications.sln`;
const project: string = `Sigmax.CityControl.Web`;

export const addFilesToSolution = (filesToAdd: string[], dirToAdd?: string): void => {
  exec(`powershell -File ${scriptPath} -solutionPath "${solution}" -projectName "${project}" -item "${filesToAdd.join(',')}" -folder "${dirToAdd}"`);
}