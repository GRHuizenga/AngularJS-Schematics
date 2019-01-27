"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.isFile = (filePath) => {
    try {
        return fs.statSync(filePath).isFile();
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        else {
            throw err;
        }
    }
};
exports.isDirectory = (dirPath) => {
    try {
        return fs.statSync(dirPath).isDirectory();
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        else {
            throw err;
        }
    }
};
exports.mkDir = (dirPath) => {
    try {
        fs.mkdirSync(dirPath);
    }
    catch (err) {
        console.log(`Error creating directory '${dirPath}'`);
        console.log(`Error: ${err.code}`);
        process.exit(1);
    }
};
exports.readFile = (filePath) => {
    return fs.readFileSync(filePath, 'utf-8');
};
exports.writeFile = (filePath, fileData) => {
    fs.writeFileSync(filePath, fileData);
};
//# sourceMappingURL=file.js.map