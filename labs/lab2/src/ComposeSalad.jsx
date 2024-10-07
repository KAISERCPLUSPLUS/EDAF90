import { useState, useMemo, useId } from 'react';
import { useOutletContext, useNavigate, Outlet } from 'react-router-dom';
import Salad from "./lab1.mjs"
import inventory from './inventory.mjs';

function ComposeSalad() {
  const { inventory, addToCart } = useOutletContext();
  const defaultFoundation = '';
  const defaultProtein = '';
  const defaultDressing = '';
  const defaultExtras = {};
  const navigate = useNavigate();
  const foundationList = useMemo(()=>Object.keys(inventory).filter(name => inventory[name].foundation), [inventory]);
  const proteinList = useMemo(() => Object.keys(inventory).filter(name => inventory[name].protein));
  const extrasList = useMemo(() => Object.keys(inventory).filter(name => inventory[name].extra));
  const dressingList = useMemo(() => Object.keys(inventory).filter(name => inventory[name].dressing));
  const [foundation, setFoundation] = useState(defaultFoundation);
  const [protein, setProtein] = useState(defaultProtein);
  const [dressing, setDressing] = useState(defaultDressing);
  const [extras, setExtras] = useState(defaultExtras);
  const [touched, setTouched] = useState(false);
  const [showExtrasError, setExtrasError] = useState(true);
  const [numExtras, setNumExtras] = useState(0);

  function handleFoundation(event){
    setFoundation(event.target.value);
  }

  function Select({label, onChange, value, options}){
    const id = useId();
    return(
      <fieldset className="row h-400 p-5 bg-light border rounded-3">

        <label htmlFor={id} className="form-label">{<b>{label}</b>}</label>
        <select required value={value} className="form-select" id={id} onChange={onChange}>
          <option value="">Gör ditt val</option>
          {options.map(element => <option value={element} key={element}> {element}, {inventory[element]["price"]} kr</option>)}
        </select>
        <div htmlFor={id} className="invalid-feedback">Vänligen välj ett alternativ</div>
      </fieldset>
    )
  }

  function handleProtein(event){
    setProtein(event.target.value);
  }

  function handleDressing(event){
    setDressing(event.target.value);
  }

  function handleExtras(event){
    let newExtras = numExtras + (event.target.checked ? 1 : -1);
    setExtras({...extras, [event.target.name]: event.target.checked});
    setNumExtras(newExtras);
    setExtrasError(newExtras < 3 || newExtras > 9); // Bad practice?
  }

  function handleSubmit(event){
    event.preventDefault();
    // Count extras
    if(!event.target.checkValidity() || showExtrasError){
      setTouched(true);
    } else {
      const newSalad = new Salad();
      // Foundation, protein, dressing
      newSalad.add(foundation, inventory[foundation])
      .add(protein, inventory[protein])
      .add(dressing, inventory[dressing]);
      //extras
      Object.keys(extras).filter(extra => extras[extra])
      .forEach(extra => newSalad.add(extra, inventory[extra]));
      addToCart(newSalad);
      setFoundation(defaultFoundation);
      setProtein(defaultProtein);
      setDressing(defaultDressing);
      setExtras(defaultExtras);
      setTouched(false);
      navigate("/view-order/confirm/" + newSalad.uuid);
    }
  }

  return (
    <div className="continer col-12">
      <div className="row h-200 p-5 bg-light border rounded-3">
        {/* <Outlet context = { inventory }/> */}
        <h2>Välj innehållet i din sallad</h2>
        <form noValidate onSubmit={handleSubmit} className={touched ? "was-validated" : ""}>
          <Select label="Välj bas" onChange={handleFoundation} value={foundation} options={foundationList}/>
          <Select label = "Välj Protein" onChange={handleProtein} value = {protein} options={proteinList}/>
          <fieldset className="row h-200 p-5 bg-light border rounded-3">
            <legend className="form-label"><b>Välj tillbehör</b></legend>
            {extrasList.map(name => <div className="col-4" key={name}><input type="checkbox" onChange={handleExtras} checked={!!extras[name]} name={name} id={name}/><label htmlFor={name}>{name}</label></div>)}
            {showExtrasError && touched ? <div className="alert alert-danger" role="alert">Vänligen välj 3-9 tillbehör</div> : <></>}
          </fieldset>
          <Select label = "Välj dressing" onChange={handleDressing} value={dressing} options={dressingList}/>
          <input className="mt-4" type="submit" value="Lägg till i varukorg" id="order"/>
        </form>

      </div>
    </div>
  );
}


export default ComposeSalad;