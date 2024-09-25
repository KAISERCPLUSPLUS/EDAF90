import { useState, useMemo } from 'react';
import Salad from "./lab1.mjs"
import inventory from './inventory.mjs';

function ComposeSalad(props) {
  const defaultFoundation = 'Pasta';
  const defaultProtein = 'Kycklingfilé';
  const defaultDressing = 'Ceasardressing';
  const defaultExtras = { Bacon: true, Fetaost: true };

  const foundationList = useMemo(()=>Object.keys(props.inventory).filter(name => props.inventory[name].foundation), [props.inventory]);
  const proteinList = Object.keys(props.inventory).filter(name => props.inventory[name].protein);
  const extrasList = Object.keys(props.inventory).filter(name => props.inventory[name].extra);
  const dressingList = Object.keys(props.inventory).filter(name => props.inventory[name].dressing);
  const [foundation, setFoundation] = useState(defaultFoundation);
  const [protein, setProtein] = useState(defaultProtein);
  const [dressing, setDressing] = useState(defaultDressing);
  const [extras, setExtras] = useState(defaultExtras);

  function handleFoundation(event){
    // console.log(this);
    setFoundation(event.target.value);
  }

  function handleProtein(event){
    setProtein(event.target.value);
  }

  function handleDressing(event){
    setDressing(event.target.value);
  }

  function handleExtras(event){
    setExtras({...extras, [event.target.name]: event.target.checked});
  }

  function handleSubmit(event){
    event.preventDefault();
    const newSalad = new Salad();
    // Foundation, protein, dressing
    newSalad.add(foundation, props.inventory[foundation])
    .add(protein, props.inventory[protein])
    .add(dressing, props.inventory[dressing]);
    //extras
    Object.keys(extras).filter(extra => extras[extra])
    .forEach(extra => newSalad.add(extra, inventory[extra]));
    props.setCart([...props.cart, newSalad]);
    setFoundation(defaultFoundation);
    setProtein(defaultProtein);
    setDressing(defaultDressing);
    setExtras(defaultExtras);
  }

//   function makeOptions(inv, prop) {
//     const options = foundationList.map(element => <option value={element} key={element}> {element}, {inv[element]["price"]} kr</option>)
// /*
//     const options = Object.entries(inv)
//       .filter((entry)=>{
//         entry[prop];
//        // console.log("entry", entry);
//       })
//       .map(element =>
//         <option value={element[0]} key={element[0]}> {element[0]}, {element[1]["price"]} kr</option>
//       )*/
//     return options;
//   }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        <h2>Välj innehållet i din sallad</h2>
        <form onSubmit={handleSubmit}>
          <fieldset className="col-md-12 row h-400 p-5 bg-light border rounded-3">
            <label htmlFor="foundation" className="form-label"><b>Välj bas</b></label>
            <select value={foundation} className="form-select" id="foundation" onChange={handleFoundation}>
              {foundationList.map(element => <option value={element} key={element}> {element}, {props.inventory[element]["price"]} kr</option>)}
            </select>
          </fieldset>

          <fieldset className="row h-400 p-5 bg-light border rounded-3">
            <label htmlFor="protein" className="form-label" ><b>Välj protein</b></label>
            <select value={protein} className="form-select" id="protein" onChange={handleProtein}>
              {proteinList.map(element => <option value={element} key={element}> {element}, {props.inventory[element]["price"]} kr</option>)}
            </select>
          </fieldset>

          <fieldset className="row h-200 p-5 bg-light border rounded-3">
            <legend className="form-label" htmlFor="extras"><b>Välj tillbehör</b></legend>
            {extrasList.map(name => <div className="col-4" key={name}><input type="checkbox" onChange={handleExtras} checked={!!extras[name]} name={name} id={name}/><label htmlFor={name}>{name}</label></div>)}
          </fieldset>

          <fieldset className="row h-400 p-5 bg-light border rounded-3">
            <label htmlFor="dressing" className="form-label" ><b>Välj dressing</b></label>
            <select value={dressing} className="form-select" id="dressing" onChange={handleDressing}>
              {dressingList.map(element => <option value={element} key={element}> {element}, {props.inventory[element]["price"]} kr</option>)}
            </select>
          </fieldset>
          <input className="mt-4" type="submit" value="Lägg till i varukorg" id="order"/>
        </form>

      </div>
    </div>
  );
}


export default ComposeSalad;