const Logger = require("./Loger");
const Result = require("./Result");
const DatabaseError = require("./DatabaseError");
const File = require("./File");

module.exports = class Database {

	constructor(){}

	async _add(problemName, jsonString){
		return new Promise((resolve, reject) => {
			const fullFilePath = File.removePathEscapes(`server/database/${problemName}.json`);
			const fileResult = File.writeFile(fullFilePath, jsonString, problemName)
			if(fileResult.success) resolve(fileResult);
			else reject(fileResult);
		});
	}

	async add(problemName, jsonString){
		Logger.log("Database", `Trying to add a new problem named "${problemName}" to the database`);
		const result = await this._add(problemName, jsonString);
		if(result.success) Logger.log("Database", `Successfully added a new problem named ${problemName} to the database`);
		return result;
	}

	async _query(problemName){
		const filesList = File.listDirectoryFiles("server/database");
		const resultList = [];
		for(const fileName of filesList){
			const fileNameOnly = fileName.replace(/(?:\.([^.]+))?$/, "");
			if(fileNameOnly === problemName){
				const fileResult = File.readFile(`server/database/${problemName}.json`);
				fileResult.data = fileResult.data.toString();
				return fileResult;
			}
			if(fileNameOnly.startsWith(problemName)) resultList.push(fileNameOnly);
			if(resultList.length >= 10) break;
		}
		return new Result(true, resultList);
	}

	async query(problemName){
		Logger.log("Database", `Trying to find matching problem(s) in the database`);
		const result = await this._query(problemName);
		if(result.success) Logger.log("Database", `Successfully found matching problems(s) in the database`);
		else Logger.log("Database", `Could not find matching problems(s) in the database`);
		return result;
	}

	async _clear(){
		return new Promise((resolve, reject) => {
			File.clearDirectory("server/database", [".placeholder"]);
			resolve(new Result(true));
		});
	}

	async clear(){
		Logger.warn("Database", `Trying to clear the database`);
		const result = await this._clear();
		if(result.success) Logger.warn("Database", `Successfully cleared the database`);
		return new Result(result.success);
	}
}