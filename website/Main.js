// DO NOT REMOVED UTIL HAS IT SETS GLOBALS
import Util from "./scripts/Util.js";
import Loader from "./scripts/Loader.js";
import GrimgarHelper from "./scripts/GrimgarHelper.js"

export default class Main {
	
	static async main_(){
		const framework = await Loader.loadFragment_("Framework");
		framework.attach();
		GrimgarHelper.init();
	}
}

Main.main_();