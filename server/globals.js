/* GLOBAL VARIABLES */
global.databases = {
	developer: "developer",
	production: "production",
};
/*
global.collections = {
	users: "users",
	tokens: "tokens",
}
*/

// ===============================================
// 					  Commands
// ===============================================

global.commandRegex = /^\/(\w+)(\?(([^=]+=[^=]+&?)+)?)?$/;
global.commandOptions = {
	developer: {
		name: "developer",
		type: Boolean,
		names: new Set(["d", "developer"]),
		description: {
			short: "use_developer_database",
			long: "Whether to use the developer database over the production one.",
		},
	},
	path: {
		name: "path",
		type: String,
		names: new Set(["p", "path"]),
		description: {
			short: "path",
			long: "The path of something.",
		},
	},
	name: {
		name: "name",
		type: String,
		names: new Set(["n", "name"]),
		description: {
			short: "name",
			long: "The name of something.",
		},
	},
	dataString: {
		name: "dataString",
		type: String,
		names: new Set(["d", "ds", "data", "dataString"]),
		description: {
			short: "data_string",
			long: "The String of some sort of data.",
		},
	}
}
