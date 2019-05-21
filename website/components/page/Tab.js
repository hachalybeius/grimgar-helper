import Component from "../Component.js";

export default class Tab extends Component{
	constructor(...args){
		super(...args);
		/** @type String */
		this._tabName;
	}

	construct(name){
		this._constructRoot();
		this._constructTabName(name);
		this._constructTabClose();
	}

	_constructRoot(){
		this._create();
		this.flex("static", "row");
		this.attr("button", "");
		this.addClass("Tab");
	}

	_constructTabName(name){
		this._tabName = name;

		const tabName = new Component();
		tabName.flex("dynamic");
		tabName.font();
		tabName.text(this._tabName);

		this.append(tabName);
	}

	_constructTabClose(){
		const tabClose = new Component();
		tabClose.flex("static");
		tabClose.font("center");
		tabClose.attr("button", "");
		tabClose.addClass("TabClose");
		tabClose.text("+");

		// TODO: add on click event

		this.append(tabClose);
	}
}