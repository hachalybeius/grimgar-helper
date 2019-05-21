const Http = require("http");
const Path = require("path");
const Url = require("url");

const Globals = require("./globals");
const Result = require("./Result");
const Logger = require("./Logger");
const QueryError = require("./QueryError");

module.exports = class Server {

	static async handleCommand(commandQuery, resource){
		const commandArray = commandRegex.exec(commandQuery);
		if(commandArray == undefined || commandArray.length < 3) throw new QueryError();
		const commandName = commandArray[1];
		const commandPath = `./commands/${commandName}.js`
		const commandOptionObj = {};
		if(commandArray[3] !== undefined){
			commandArray[3].split('&').forEach((elem) => {
				const optionArray = elem.split('=');
				commandOptionObj[optionArray[0]] = decodeURIComponent(optionArray[1]);
			});
		}

		let Command = undefined;
		try {
			Command = require(commandPath);
		} catch (e) { throw new QueryError(); }

		Logger.log("Server", `Trying to execute command ${commandName}`);
		const commandResult = await (new Command()).execute(commandOptionObj, resource);
		if(commandResult !== undefined && !commandResult.success) Logger.warn("Server", `Execution of command ${commandName} failed`);
		return commandResult;
	}

	static async handleHTTPRequest(request, resource){
		Logger.log("Server", "Starting to handle HTTP request");
		resource.json = (obj) => { if(obj) resource.write(JSON.stringify(obj)) };
		const uri = decodeURIComponent(request.url);
		Logger.log("Server", `Request input: "${uri}"`);
	
		try {
			const commandResult = await Server.handleCommand(uri, resource);
			resource.json(commandResult);
		} catch(e) {
			if(!(e instanceof QueryError)) throw e;
	
			const readFileArray = /^\/(([0-9a-zA-Z\-_. ]+\/)*)([0-9a-zA-Z\-_. ]*)$/.exec(uri);
			if(readFileArray !== null){
				const readFilePath = readFileArray[1];
				const readFileName = readFileArray[3];
	
				Logger.log("Server", `Trying to read file "${uri}"`);
				const ReadFileCommand = require("./commands/readFile");
				const readFileResult = await (new ReadFileCommand())._execute(readFilePath, readFileName, resource);
				if(!readFileResult.success) {
					Logger.warn("Server", `Requested file "${uri}" not found`);
					resource.json(readFileResult);
				}
			} else {
				Logger.warn("Server", `Requested file path was invalid`);
				resource.json(
					new Result(
						false,
						{},
						"Given an invalid path.",
						"Input path was in an invalid structure."
					));
			}
		}
	
	
		resource.end();
		Logger.log("Server", "Done handling HTTP request");
	}

	static init(){
		Server.httpServer = Http.createServer(Server.handleHTTPRequest);
		process.on('unhandledRejection', (error) => {
			Logger.err("Server", error);
		});

		Server.httpServer.listen(8080);
		Logger.log("Server", "Running on Port 8080 ...");
	}
}.init();