const FileSystem = require("fs");
const Path = require("path")

const Logger = require("./Logger");
const Result = require("./Result");

const rootDir = Path.join(__dirname, "..");

module.exports = class File {

	constructor(){}

	static removePathEscapes(path){
		return path.replace(/\.\.\/|\.\.\\/g, "");
	}

	static _readFile(fullFilePath, errPartialFileName=""){
		Logger.log("File", `Reading file "${fullFilePath}"`);
		try {
			const data = FileSystem.readFileSync(fullFilePath);
			return new Result(true, data);
		} catch (e) {
			switch(e.code){
				case "ENOENT": return new Result(false, {}, "File not found.", `The file "${errPartialFileName}" was not found.`);
				default: return new Result(false, {}, "Unknown File Error", `An unknown File IO Error occured.`);
			}
		}
	}

	static readFile(fileName){
		const fullFilePath = Path.join(rootDir, fileName);
		return this._readFile(fullFilePath, fileName);
	}

	static readWebFile(fileName){
		const fullFilePath = Path.join(rootDir, "website", fileName);
		return this._readFile(fullFilePath, fileName);
	}

	static _writeFile(fullFilePath, fileContents, errPartialFileName=""){
		Logger.log("File", `Writing file "${fullFilePath}"`);
		try {
			const data = FileSystem.writeFileSync(fullFilePath, fileContents);
			return new Result(true, data);
		} catch (e) {
			switch(e.code){
				case "ENOENT": return new Result(false, {}, "File could not be written to.", `The file "${errPartialFileName}" could not be written to.`);
				default: return new Result(false, {}, "Unknown File Error", `An unknown File IO Error occured.`);
			}
		}
	}

	static writeFile(fileName, fileContents){
		const fullFilePath = Path.join(rootDir, fileName);
		return this._writeFile(fullFilePath, fileContents, fileName);
	}

	static _deleteFile(fullFilePath, errPartialFileName=""){
		Logger.log("File", `Deleting file "${fullFilePath}"`);
		try {
			const data = FileSystem.unlinkSync(fullFilePath);
			return new Result(true, data);
		} catch (e) {
			switch(e.code){
				case "ENOENT": return new Result(false, {}, "File could not be deleted.", `The file "${errPartialFileName}" could not be deleted.`);
				default: return new Result(false, {}, "Unknown File Error", `An unknown File IO Error occured.`);
			}
		}
	}

	static deleteFile(fileName){
		const fullFilePath = Path.join(rootDir, fileName);
		return this._deleteFile(fullFilePath, fileName);
	}

	static _listDirectoryFiles(fullDirectoryPath){
		return FileSystem.readdirSync(fullDirectoryPath);
	}

	static listDirectoryFiles(directoryName){
		const fullDirectoryPath = Path.join(rootDir, directoryName);
		return this._listDirectoryFiles(fullDirectoryPath);
	}

	static _clearDirectory(fullDirectoryPath, exceptionFileNames=[], errPartialDirectoryName=""){
		Logger.log("File", `Clearing Directory "${fullDirectoryPath}"`);
		try {
			this._listDirectoryFiles(fullDirectoryPath).forEach((file) => {
				if(!exceptionFileNames.includes(file)){
					console.log(fullDirectoryPath);
					this._deleteFile(Path.join(fullDirectoryPath, file));
				}
			});
			return new Result(true);
		} catch (e) {
			switch(e.code){
				case "ENOENT": return new Result(false, {}, "Directory could not be cleared.", `The directory "${errPartialDirectoryName}" could not be cleared.`);
				default: return new Result(false, {}, "Unknown File Error", `An unknown File IO Error occured.`);
			}
		}
	}

	static clearDirectory(directoryName, exceptionFileNames){
		const fullDirectoryPath = Path.join(rootDir, directoryName);
		return this._clearDirectory(fullDirectoryPath, exceptionFileNames, directoryName);
	}
}
