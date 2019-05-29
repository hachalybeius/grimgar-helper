import Component from "../Component.js";
import Loader from "../../scripts/Loader.js";

import PageLocations from "../../scripts/pages/PageLocations.js";

export default class Page extends Component{

	constructor(...args){
		super(...args);
	}

	init(name){
		/** @type {string} */
		this._name = name;
	}

	construct(){
		this._constructRoot();
		this._constructPage_();
	}

	_constructRoot(){
		this._create();
		this.flex("column", "static");
	}

	_constructRow(){
		const row = new Component();
		row.flex("static");
		return row;
	}

	/**
	 * @param {string} pageContent 
	 */
	_parsePage(pageContent){
		let charI = 0;
		while(charI < pageContent.length){
			let line = "";
			const row = this._constructRow();
			/* Read Line */
			while(charI < pageContent.length && pageContent[charI] !== "\n"){
				line += pageContent[charI];
				charI++;
			}
			charI++;

			switch(line[0]){
				/* Heading */
				case '#':
					let headerSize = Math.pow(5/4, 4);
					let lineCharI = 0;
					while(line[lineCharI] === "#"){
						lineCharI++;
						headerSize *= 4/5;
					}
					
					row.text(line.slice(lineCharI).trim());
					row.font("heading");
					row.css("font-size", `${headerSize}em`);
					this.append(row);
					break;
				/* Table */
				case '|':
					break;
				/* Normal Text */
				default:
					row.text(line);
					row.font();
					this.append(row);
					break;
			}
		}
	}

	async _constructPage_(){
		const location = PageLocations.getLocation(this._name).replace(".", "/");
		const pageContent = await Loader.loadFile_(`pages/${location}.md`);
		this._parsePage(pageContent)
	}
}