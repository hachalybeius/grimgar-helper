import Page from "../components/page/Page.js";


export default class GrimgarHelper {
	static init(){
		/** @type Page */
		GrimgarHelper.page = new Page();
		GrimgarHelper.page.openTab("Test");
	}
}