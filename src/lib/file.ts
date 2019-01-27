import * as fs from 'fs';

export const isFile = (filePath: string): boolean => {
  try {
    return fs.statSync(filePath).isFile();
  } catch(err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}

export const isDirectory = (dirPath: string): boolean => {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
}

export const mkDir = (dirPath: string): void => {
  try {
    fs.mkdirSync(dirPath);
  } catch (err) {
    console.log(`Error creating directory '${dirPath}'`);
    console.log(`Error: ${err.code}`);
    process.exit(1);
  }
}

export const readFile = (filePath: string): string => {
  return fs.readFileSync(filePath, 'utf-8');
}

export const writeFile = (filePath: string, fileData: string): void => {
  fs.writeFileSync(filePath, fileData);
}