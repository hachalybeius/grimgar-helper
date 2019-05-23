import Component from "../Component.js";
import Page from "../page/Page.js";

import PageLocations from "../../scripts/pages/PageLocations.js";

export default class MenuOption extends Component{
	constructor(...args){
		super(...args);
	}

	init(name){
		this._name = name;
	}

	construct(){
		this._constructRoot();
		this._constructOptions();
	}

	_constructRoot(){
		this._create();
		this.flex("static");
		this.attr("button", "");
		this.font("center");
		this.addClass("MenuOption");
		this.text(this._name)
	}

	_constructOption(optionName){
		const option = new Component();
		option.flex("static");
		option.font("left");
		option.text(optionName);
		option.click(() => {
			Page.openTab(`${this._name}.${optionName}`);
		});

		return option;
	}

	_constructOptions(){
		const invisContainer = new Component();
		invisContainer.height("0em");
		invisContainer.flex("column", "dynamic");

		const optionContainer = new Component();
		optionContainer.flex("column", "static");
		optionContainer.addClass("MenuOptionList");
		optionContainer.foreground();

		for(const optionName of PageLocations.get(this._name)){
			const option = this._constructOption(optionName);
			optionContainer.append(option);
		}
		
		invisContainer.append(optionContainer)
		this.append(invisContainer);
	}
}