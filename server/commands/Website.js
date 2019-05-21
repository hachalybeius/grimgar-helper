const Logger = require("../Logger")
const Result = require("../Result").Result
const AbstractCommand = require("./AbstractCommand");

const File = require("../File");

module.exports = class Website extends AbstractCommand {

	constructor(){
		super();

		this.options = [];
	}

	async _execute(resource){
		const fileResult = await File.readWebFile("Main.html");
		if(fileResult.success) {
			resource.writeHead(200, {'Content-Type': 'text/html'});
			resource.write(fileResult.data);
		}

		return fileResult;
	}


	async execute(query, resource){
		Logger.log("Website", "Page requested");
		const fileResult = await this._execute(resource);
		if(!fileResult.success) {
			Logger.err("Website", "Page not found");
			return new Result(
				false,
				{},
				"The website could not be loaded.",
				"The website html index file could not be read."
			);
		}

		Logger.log("Website", "Page loaded")
		return;
	}
}