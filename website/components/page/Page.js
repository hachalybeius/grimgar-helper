import Component from "../Component.js";
import Tab from "./Tab.js";

export default class Page extends Component{
	constructor(...args){
		super(...args);
		/** @type Component */
		this._banner;
		/** @type Component */
		this._content;
	}

	_construct(){

	}

	_constructRoot(){
		this._elem = $("#Page");
		this._banner = this.findId("Banner");
		this._content = this.findId("Content");
	}

	_createMenu(){}

	_createTab(tabName){
		const tab = new Tab(tabName);
		this._banner.append(tab);
	}

	_createTabPage(){}

	openTab(location){
		// TODO: get the data from the location
		// then give the name of the page to the tab
		const tabName = locaiton;
		this._createTab(tabName);
	}

	closeTab(){}
}