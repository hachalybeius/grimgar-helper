import Component from "../Component.js";
import Page from "./Page.js";

export default class Tab extends Component{
	constructor(...args){
		super(...args);
	}

	init(name){
		/** @type {string} */
		this._name = name;
	}

	construct(name){
		this._constructRoot();
		this._constructTabName();
		this._constructTabClose();
	}

	_constructRoot(){
		this._create();
		this.flex("static", "row");
		this.attr("button", "");
		this.addClass("Tab");
	}

	_constructTabName(){
		const tabName = new Component();
		tabName.flex("dynamic");
		tabName.font();
		tabName.text(this._name);

		this.append(tabName);
	}

	_constructTabClose(){
		const tabClose = new Component();
		tabClose.flex("static");
		tabClose.font("center");
		tabClose.attr("button", "");
		tabClose.addClass("TabClose");
		tabClose.text("+");
		tabClose.click(() => {
			Page.closeTab(this._name)
		});

		this.append(tabClose);
	}
}