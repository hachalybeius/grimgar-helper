const ElectronApp = require("electron").app;
const Protocol = require("electron").protocol;

const Window = require("./Window");
const File = require("../server/File");
const Logger = require("../server/Logger.js");

module.exports.App = class App {

	static async restart_(){
		if(!App.window.isOpen()) App.window.open();
		App.window.setFullscreen(true);
		await App.window.ready_();
		App.window.show();
	}

	static init(){
		Protocol.registerBufferProtocol("js", (request, callback) => {
			const requestURL = File.removePathEscapes(request.url.replace("js://", "").replace(/^website[\//]/, ""));
			const result = File.readWebFile(requestURL);
			if(result.success) callback({mimeType: "text/javascript", data: result.data});
			else {
				callback({mimeType: "text/plain", data: result});
				Logger.warn("App", result.devMessage);
			}
		});

		const fileResult = File.readWebFile("Main.html");
		if(!fileResult.success) throw new Error("Could not find/read website main html file");

		const fileContent = fileResult.data.toString();
		const searchRegex = /src="(([\w]+\/)*(Main.js))"/;
		const fileResultArr = searchRegex.exec(fileContent);
		const jsProtocolMainSrc = `src="js://website/${fileResultArr[1]}"`;
		const jsProtocolMainFileContent = fileContent.replace(searchRegex, jsProtocolMainSrc);
		File.writeFile("website/App.html", jsProtocolMainFileContent);

		App.window = new Window();
		App.window.setIndex("website/App.html");
		App.restart_();
	}

	static main(){

		Protocol.registerStandardSchemes(["js"]);

		// Start Main method
		ElectronApp.on("ready", App.init);

		// Quit when all windows are closed.
		ElectronApp.on("window-all-closed", () => {
			// Keep app alive on MacOS (since you use Cmd-Q to quit)
			if (process.platform !== "darwin") ElectronApp.quit()
		})

		// Restart the window for Mac
		ElectronApp.on("activate", App.restart_);
	}
}.main();