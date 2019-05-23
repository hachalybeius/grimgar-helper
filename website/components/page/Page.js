import Component from "../Component.js";
import MenuOption from "../menu/MenuOption.js";
import Tab from "./Tab.js";

import PageLocations from "../../scripts/pages/PageLocations.js";

export default class Page extends Component{

	static init(){
		PageLocations.init();

		if(Page._page === undefined) Page._page = new Page();
	}

	constructor(...args){
		super(...args);
	}

	init(){
		/** @type {Component} */
		this._menu;
		/** @type {Component} */
		this._banner;
		/** @type {Component} */
		this._content;
		/** @type {Object.<string, Tab>} */
		this._tabs = {};
		/** @type {Object.<string, Component>} */
		this._pages = {};
	}

	construct(){
		this._constructRoot();
		this._constructMenu();
	}

	_constructRoot(){
		this._elem = $("#Framework");
		this._menu = this.findId("Menu");
		this._banner = this.findId("Banner");
		this._content = this.findId("Content");

		this._banner.scrollX();
	}

	_constructMenu(){
		for(const optionName in PageLocations.locations()){
			const menuOption = new MenuOption(optionName);
			this._menu.append(menuOption);
		}
	}

	_createTab(tabName){
		const tab = new Tab(tabName);
		this._tabs[tabName] = tab;
		this._banner.append(tab);
	}

	_createTabPage(){}

	static openTab(location){
		const tabName = /\.(.+)$/.exec(location)[1];

		if(Page._page._tabs[tabName] !== undefined) return;
		// TODO: get the data from the location
		// then give the name of the page to the tab
		Page._page._createTab(tabName);
	}

	static closeTab(name){
		Page._page._tabs[name].remove();
		delete Page._page._tabs[name];
	}
}