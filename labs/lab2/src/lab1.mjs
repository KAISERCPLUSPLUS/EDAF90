'use strict';
/**
 * Reflection question 1
 * If a key is used which hasn't been initialized js returns undefined (i.e. it doesn't crash). Omitting keys with falsy
 * values takes less space and makes it more clean without changing the functionality
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';

class Salad {
	static #instanceCounter = 0;
	#id;
	constructor(other_salad) {
		// Check if other_salad is from parse

		if(other_salad?.parsing && other_salad.uuid){
			this.uuid = other_salad.uuid;
		} else{
			this.uuid = uuidv4();
		}
		this.#id = 'salad_' + Salad.#instanceCounter++;
		if(other_salad?.ingredients){ // Fråga om instanceOf och vår alternativa lösning
			this.ingredients = {...other_salad.ingredients};
		}
		else {
			this.ingredients = {};
		}
	}
	add(name, properties) {
		this.ingredients[name] = properties;
		return this;
	}
	remove(name) {
		delete this.ingredients[name];
		return this;
	}
	static parse(json) {
		const parsedJson = JSON.parse(json)
		parsedJson.parsing = true;
		return Array.isArray(parsedJson) ?  parsedJson.map(entry => new Salad(entry)): new Salad(parsedJson);
	}
	get_id(){
		return this.#id;
	}
	get_desc(){
		return Object.keys(this.ingredients).join(", ");
	}
}
Salad.prototype.getPrice = function() {
	return Object.entries(this.ingredients).reduce((accumulator, currentEntry)=>accumulator + currentEntry[1]["price"], 0);
}

Salad.prototype.count = function(prop) {
	return Object.values(this.ingredients).filter(entry => entry[prop]).length
}

export default Salad;