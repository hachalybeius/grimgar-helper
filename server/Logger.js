module.exports = class Logger {

	static log(header, message){
		console.log(Logger._constructMessage("INFO", header), message);
	}
	
	static warn(header, message){
		console.warn(Logger._constructMessage("WARNING", header), message);
	}
	
	static err(header, error){
		console.error(Logger._constructMessage("ERROR", header), error.stack);
	}

	static _constructMessage(title, header, message){
		return "[" + title +"] "  + strRepeat(" ", module.exports.titleSize - 3 - title.length)
			+ header + ": " + strRepeat(" ", module.exports.headingSize - 2 - header.length);
	}
}

module.exports.titleSize = 10;
module.exports.headingSize = 16;

function strRepeat(str, times){
	let output = "";
	for(let i = 0; i < times; i++){
		output += str;
	}
	return output;
}
