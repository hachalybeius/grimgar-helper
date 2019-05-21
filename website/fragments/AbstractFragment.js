import Loader from "../scripts/Loader.js";
import Component from "../components/Component.js";

export default class AbstractFragment {
	constructor(path, name){
		this.name = name || this.constructor.name;
		this.path = path || "";
		this.fullPath = `fragments/${this.path}${this.name}/`;
		this.id = this.name;
		this.location;
		/** @type Component */
		this.component;
		/** @type Component */
		this.style;
	}

	async _loadCSS_(){
		this.style = await Loader.loadCSS_(`${this.fullPath}${this.name}.css`, this.id);
	}

	async _loadHTML_(){
		this.component = await Loader.loadHTML_(`${this.fullPath}${this.name}.html`);
	}

	async load_(){
		await this._loadCSS_();
		if(this.style !== undefined) this.style.id(`${this.id}-CSS`);
		
		await this._loadHTML_();
		if(this.component !== undefined) this.component.id(`${this.id}`);
	}

	attach(){
		if(this.style !== undefined)
			document.head.appendChild(this.style.elem());
		//$(`#${this.location}`).empty();
		if(this.component !== undefined)
			$(`#${this.location}`).append(this.component.elem());

		this.attachEvents();
	}

	elem(){
		return this.component.elem();
	}

	attachEvents(){}

	detatch(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.id}`).detatch();
	}

	clear(){
		$(`#${this.id}-CSS`).remove();
		$(`#${this.id}`).remove();
	}

	componentId(componentId){
		return `${this.id}-${componentId}`;
	}
}