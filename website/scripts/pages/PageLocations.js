export default class PageLocations {
	static init(){
		
		PageLocations._locations = {
			"Equipment"	: ["Armor", "Shields", "Weapons"],
			"Classes"	: ["Dark Knight", "Hunter", "Paladin"],
			"Mechanics"	: ["Resting"],
			"Other"		: ["Incursions", "Monsters"]
		}
	}

	static getLocation(name){
		for(const locationTag in PageLocations._locations){
			for(const pageName of PageLocations.getPages(locationTag)){
				if(pageName === name)
					return `${locationTag}.${pageName}`;
			}
		}
	}

	static getPages(name){
		return PageLocations._locations[name];
	}

	/** @return {Object.<string, Array<string>>} */
	static locations(){
		return PageLocations._locations;
	}
}