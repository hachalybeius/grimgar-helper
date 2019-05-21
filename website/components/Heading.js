import Component from "./Component.js";

export default class Heading extends Component{
	constructor(...args){
		super(...args);
	}

	construct(title){
		this._constructRoot(title);
	}

	_constructRoot(title){
		this._create();
		this.font("heading");
		this.text(title);
	}
}