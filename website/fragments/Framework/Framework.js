import AbstractFragment from "../AbstractFragment.js";

export default class MainMenu extends AbstractFragment {
	constructor(...args){
		super(...args);
		this.location = "Content";
	}
}