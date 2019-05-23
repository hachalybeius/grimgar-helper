// DO NOT REMOVE UTIL AS IT SETS GLOBALS
import * as Util from "./scripts/Util.js";
import Loader from "./scripts/Loader.js";
import Page from "./components/page/Page.js";

export default class Main {
	
	static async main_(){
		const framework = await Loader.loadFragment_("Framework");
		framework.attach();
		Page.init();
		Page.openTab("Equipment.Shields");
	}
}

Main.main_();