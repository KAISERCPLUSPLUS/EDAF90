import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import inventory from './inventory.mjs';
import ComposeSalad from './ComposeSalad';
import ViewOrder from './ViewOrder';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar.jsx'


function App() {
  const [cart, setCart] = useState([]);

  function addToCart(newSalad){
    setCart([...cart, newSalad]);
  }
  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen sallsadsbar</span>
      </header>
      <Navbar/>
      <Outlet context={{ inventory, addToCart, cart }} />
      {/* <ComposeSalad inventory={inventory} addToCart={addToCart}></ComposeSalad>
      <ViewOrder shoppingCart={cart}></ViewOrder> */}
      <footer className="pt-3 mt-4 text-muted border-top">
        EDAF90 - webprogrammering
      </footer>
    </div>
  );
}

export default App;