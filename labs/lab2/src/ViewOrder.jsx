import { Outlet, useOutletContext, useParams } from 'react-router-dom';

function ViewOrder(){
    const { cart } = useOutletContext();
    let params = useParams();
    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
            <Outlet context={{uuid: params.id}}/>
            <ol className="viewOrderList">
                {cart.map(item =>
                    <li key={item.uuid} className="orderItem">
                        <div>Sallad<p className="saladName"> &emsp;{item.get_desc()}{params.id === item.uuid ? <b style={{"color": "blue"}}> Ny!</b> : <></>}</p> </div>
                        <p className="price">{item.getPrice()} kr</p>
                    </li>)}
                {<li key="total" className="orderItem">
                    <b className="saladName">Totalsumma:</b>
                    <p className="price">{cart.reduce((accumulator, item) => accumulator + item.getPrice(), 0)} kr</p>
                </li>}
            </ol>

        </div>
    )
}
export default ViewOrder;