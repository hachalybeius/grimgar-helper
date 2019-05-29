// DO NOT REMOVE UTIL AS IT SETS GLOBALS
import * as Util from "./scripts/Util.js";
import Loader from "./scripts/Loader.js";
import Window from "./components/window/Window.js";

export default class Main {
	
	static async main_(){
		const framework = await Loader.loadFragment_("Framework");
		framework.attach();
		Window.init();
		Window.openTab("Equipment.Armor");
	}
}

Main.main_();