export default class PageLocations {
	static init(){
		
		PageLocations._locations = {
			"Equipment"	: ["Armor", "Shields", "Weapons"],
			"Classes"	: ["Dark Knight", "Hunter", "Paladin"],
			"Mechanics"	: ["Resting"],
			"Other"		: ["Incursions", "Monsters"]
		}
	}

	static get(name){
		return PageLocations._locations[name];
	}

	/** @return {Object.<string, Array<string>>} */
	static locations(){
		return PageLocations._locations;
	}
}