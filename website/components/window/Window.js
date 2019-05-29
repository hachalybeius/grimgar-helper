import Component from "../Component.js";
import MenuOption from "./MenuOption.js";
import Tab from "./Tab.js";
import Page from "./Page.js";

import PageLocations from "../../scripts/pages/PageLocations.js";

export default class Window extends Component{

	static init(){
		PageLocations.init();

		
		if(Window._window === undefined) Window._window = new Window();
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
		/** @type {Object.<string, Page>} */
		this._pages = {};
	}

	construct(){
		this._constructRoot();
		this._constructMenu();
	}

	_constructRoot(){
		this._elem = $("#Framework");
		console.log(this._elem)
		this._menu = this.findId("Menu");
		this._banner = this.findId("Banner");
		this._content = this.findId("Page");

		this._banner.scrollX();
	}

	_constructMenu(){
		for(const optionName in PageLocations.locations()){
			const menuOption = new MenuOption(optionName);
			this._menu.append(menuOption);
		}
	}

	_createTab(pageName){
		const tab = new Tab(pageName);
		this._tabs[pageName] = tab;
		this._banner.append(tab);
	}

	_createPage(pageName){
		const page = new Page(pageName);
		this._pages[pageName] = page;
		Window.setActivePage(pageName);
	}

	static openTab(location){
		const pageName = /\.(.+)$/.exec(location)[1];

		if(Window._window._tabs[pageName] !== undefined) return;
		Window._window._createTab(pageName);
		Window._window._createPage(pageName);
	}

	static closeTab(name){
		const tabOrders = [undefined, undefined];
		const tabNames = Object.keys(Window._window._tabs);
		for(let tabNameI = 0; tabNameI < tabNames.length; tabNameI++){
			if(tabNames[tabNameI] === name){
				if(tabNameI > 0)
					tabOrders[0] = tabNames[tabNameI - 1]
				if(tabNameI < tabNames.length - 1)
					tabOrders[1] = tabNames[tabNameI + 1]
			}
		}
		
		if(tabOrders[0] !== undefined)
			Window.setActivePage(tabOrders[0]);
		else
			Window.setActivePage(tabOrders[1]);

		Window._window._tabs[name].remove();
		delete Window._window._tabs[name];
		delete Window._window._pages[name];
	}

	static setActivePage(name){
		Window._window._content.clear();
		if(name !== undefined){
			const page = Window._window._pages[name];
			Window._window._content.append(page);
		}
	}
}

/** @type {Window} */
Window._window;