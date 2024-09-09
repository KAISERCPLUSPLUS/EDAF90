'use strict';
/**
 * Reflection question 1
 * If a key is used which hasn't been initialized js returns undefined (i.e. it doesn't crash). Omitting keys with falsy
 * values takes less space and makes it more clean without changing the functionality
 */

import inventory from './inventory.mjs';
import { v4 as uuidv4 } from 'uuid';
/* console.log('\n=== beginning of printout ================================')
console.log('inventory:', inventory); */
console.log('\n--- Object.keys() ---------------------------------------')
const names = Object.keys(inventory);
// console.log("values", Object.entries(inventory).concat)
// names.forEach(name => console.log(name))
// console.log(typeof inventory)

// console.log('\n--- for ... in ---------------------------------------')
// for (const name in inventory) {
//  console.log(name);
// }
/**
 * Reflection question 2
 * forEach is a non-enumerable property, inherited from Object.prototype. For in only iterates over enumerable properties
 */

// names
//  .sort((a, b) => a.localeCompare(b, "sv", { sensitivity: 'base' }))
//  .forEach((name,index,array) => console.log(name));


console.log('\n--- Assignment 1 ---------------------------------------')

function makeOptions(inv, prop) {
	const options = Object.entries(inv)
		.filter((entry)=>entry[prop])
		.map(element =>
			`<option value="${element[0]}" key="${element[0]}"> ${element[0]}, ${element[1]["price"]} kr</option>`
		)
		// <option value={element[0]} key={element[0]}>{element[0]}</option>})
	return options
}

console.log(makeOptions(inventory, 'foundation'));

console.log('\n--- Assignment 2 ---------------------------------------')
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
		// if(Array.isArray(parsedJson)){
		// 	return parsedJson.map(entry => new Salad(entry))
		// }
		// return new Salad(parsedJson);
	}
	get_id(){
		return this.#id;
	}
}

let myCaesarSalad = new Salad()
	.add('Sallad', inventory['Sallad'])
	.add('Kycklingfilé', inventory['Kycklingfilé'])
	.add('Bacon', inventory['Bacon'])
	.add('Krutonger', inventory['Krutonger'])
	.add('Parmesan', inventory['Parmesan'])
	.add('Ceasardressing', inventory['Ceasardressing'])
	.add('Gurka', inventory['Gurka']);
console.log(JSON.stringify(myCaesarSalad) + '\n');
myCaesarSalad.remove('Gurka');
console.log(JSON.stringify(myCaesarSalad) + '\n');

console.log('\n--- Assignment 3 ---------------------------------------')
Salad.prototype.getPrice = function() {
	return Object.entries(this.ingredients).reduce((accumulator, currentEntry)=>accumulator + currentEntry[1]["price"], 0);
}

Salad.prototype.count = function(prop) {
	return Object.values(this.ingredients).filter(entry => entry[prop]).length
}


console.log('En ceasarsallad kostar ' + myCaesarSalad.getPrice() + 'kr');
// En ceasarsallad kostar 45kr
console.log('En ceasarsallad har ' + myCaesarSalad.count('lactose') + ' ingredienser med laktos');
// En ceasarsallad har 2 ingredienser med laktos
console.log('En ceasarsallad har ' + myCaesarSalad.count('extra') + ' tillbehör');
// En ceasarsallad har 3 tillbehör


console.log('\n--- reflection question 3 ---------------------------------------')
console.log('typeof Salad: ' + typeof Salad); // Salad() is the constructor which constructs an object of the class Salad
console.log('typeof Salad.prototype: ' + typeof Salad.prototype);
console.log('typeof Salad.prototype.prototype: ' + typeof Salad.prototype.prototype);
console.log('typeof myCaesarSalad: ' + typeof myCaesarSalad);
console.log('typeof myCaesarSalad.prototype: ' + typeof myCaesarSalad.prototype); // ?
console.log('check 1: ' + (Salad.prototype === Object.getPrototypeOf(Salad)));
console.log('check 2: ' + (Salad.prototype === Object.getPrototypeOf(myCaesarSalad)));
console.log('check 3: ' + (Object.prototype === Object.getPrototypeOf(Salad.prototype)));

console.log('\n--- Assignment 4 ---------------------------------------')
const testSalad = new Salad(myCaesarSalad)
myCaesarSalad.remove("Bacon")
// Salad.parse = function(){

// }
const singleText = JSON.stringify(myCaesarSalad);
const arrayText = JSON.stringify([myCaesarSalad, myCaesarSalad]);

const objectCopy = new Salad(myCaesarSalad);
const singleCopy = Salad.parse(singleText);
const arrayCopy = Salad.parse(arrayText);

console.log('original myCaesarSalad\n' + JSON.stringify(myCaesarSalad));
console.log('new(myCaesarSalad)\n' + JSON.stringify(objectCopy));
console.log('Salad.parse(singleText)\n' + JSON.stringify(singleCopy));
console.log('Salad.parse(arrayText)\n' + JSON.stringify(arrayCopy));

singleCopy.add('Gurka', inventory['Gurka']);
console.log('originalet kostar ' + myCaesarSalad.getPrice() + ' kr');
console.log('kopian med gurka kostar ' + singleCopy.getPrice() + ' kr');

console.log('\n--- Assignment 5 ---------------------------------------')
class GourmetSalad extends Salad {
	constructor(otherSalad){
		super();
		if(otherSalad?.ingredients){
			Object.entries(otherSalad.ingredients).forEach(entry =>{
				if(!(Object.keys(entry[1]).includes("size"))){
					this.add(entry[0], entry[1], 1)
				} else{
					let size = entry[1]["size"]
					delete entry[1]["size"]
					this.add(entry[0], entry[1], size)
				}
			})
		}
	}

	add(name, properties, size = 1){

		if(!this.ingredients[name]){
			// add size to properties
			const newProperties = {}
			Object.keys(properties).forEach(prop => newProperties[prop] = properties[prop]);
			newProperties["size"] = size;
			super.add(name,newProperties);
		} else{
			// add size
			this.ingredients[name]["size"] += size;
		}
		return this;
	}
	// Varför dyker inte denna upp när man skriver GourmetSalad.prototype?
	// getPrice(){
	// 	return Object.entries(this.ingredients).reduce((accumulator, currentEntry)=>accumulator + currentEntry[1]["size"]*currentEntry[1]["price"], 0);
	// }
}

GourmetSalad.prototype.getPrice = function(){
	return Object.entries(this.ingredients).reduce((accumulator, currentEntry)=>accumulator + currentEntry[1]["size"]*currentEntry[1]["price"], 0);
}

let myGourmetSalad = new GourmetSalad()
	.add('Sallad', inventory['Sallad'], 0.5)
	.add('Kycklingfilé', inventory['Kycklingfilé'], 2)
	.add('Bacon', inventory['Bacon'], 0.5)
	.add('Krutonger', inventory['Krutonger'])
	.add('Parmesan', inventory['Parmesan'], 2)
	.add('Ceasardressing', inventory['Ceasardressing']);
console.log('Min gourmetsallad med lite bacon kostar ' + myGourmetSalad.getPrice() + ' kr');
myGourmetSalad.add('Bacon', inventory['Bacon'], 1)
console.log('Med extra bacon kostar den ' + myGourmetSalad.getPrice() + ' kr');

console.log('\n--- Assignment 6 ---------------------------------------');
// Why is this not allowed
// let a = myCaesarSalad.get_id()++;
console.log('Min gourmetsallad har id: ' + myCaesarSalad.get_id());
console.log('Min gourmetsallad har id: ' + myGourmetSalad.get_id());


/**
 * Reflection question 4
 * 
 * In the constructor function object.
 */
/**
 * Reflection question 5
 * 
 * Make the property private and add a getter.
 */
/**
 * Reflection question 6
 * 
 * Yes, add # in front. Use getter to access value
 */



console.log('\n--- Assignment 7 ---------------------------------------');
console.log('Min caesarsallad har uuid: ' + myCaesarSalad.uuid);
console.log('SingleCopy har uuid: ' + singleCopy.uuid)
console.log('Min gourmetsallad har uuid: ' + myGourmetSalad.uuid);

/* // Use-case 1
const salad1 = new Salad();
// add ingredients to salad 1
const salad2 = new Salad(salad1)
// salad1.uuid !== salad2.uuid, they are different salads
salad2.add('Bacon', inventory['Bacon']);
console.log('Salad 1 har uuid: ' + salad1.uuid);
console.log('Salad 2 har uuid: ' + salad2.uuid);
// order(salad1, salad2); */



// Use-case 2
/* const salad1 = new Salad(); // add ingredients to salad 1
storeInDatabase(salad1);
// app is reloaded, all JavaScript objects are lost
const text = fetchFromDatabase();
const salad2 = Salad.parse(text);
// salad1.uuid === salad2.uuid, they are the same salad
salad2.add('Bacon', inventory['Bacon']);
storeSaladInDatabase(salad2); // update the existing salad */