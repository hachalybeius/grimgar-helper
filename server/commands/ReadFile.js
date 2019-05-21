const Logger = require("../Logger");
const Result = require("../Result");
const AbstractCommand = require("./AbstractCommand");

const File = require("../File");

module.exports = class ReadFile extends AbstractCommand {

	constructor(){
		super();

		this.options = [
			[global.commandOptions.path, false],
			[global.commandOptions.name, true],
		];
	}

	async _execute(path, name, resource){
		const fullFilePath = File.removePathEscapes(`${path}/${name}`);
		const readFileExtension = /(?:\.([^.]+))?$/.exec(name)[1];
		const fileResult = File.readWebFile(fullFilePath);
		if(fileResult.success) {
			switch (readFileExtension) {
				case "js":
					resource.writeHead(200, {'Content-Type': 'text/javascript'});
					break;
				case "css":
					resource.writeHead(200, {'Content-Type': 'text/css'});
					break;
				case "html":
					resource.writeHead(200, {'Content-Type': 'text/html'});
					break;
				case "ico":
					readFilePath = readFilePath.slice(0, -3) + "png";
					readFileExtension = "png";
				case "png":
					resource.writeHead(200, {'Content-Type': 'image/png'});
					break;
				default:
					resource.writeHead(200, {'Content-Type': 'text/plain'});
					break;
			}

			resource.write(fileResult.data);
		}

		return fileResult;
	}

	async execute(query, resource){
		const optionResult = this._separateOptions(query);
		if(!optionResult.success) return optionResult;
		let [path, name] = optionResult.data;
		if(path === undefined) path = "";
		if(name === undefined) name = "Index.html";

		Logger.log("ReadFile", "File requested");
		const fileResult = await this._execute(path, name, resource);
		if(!fileResult.success) {
			Logger.warn("ReadFile", `Requested file ${path}/${name} not found`);
			return new Result(
				false,
				{},
				"The file could not be read.",
				"The file could not be read."
			);
		}

		Logger.log("ReadFile", "File read")
		return fileResult;
	}
}