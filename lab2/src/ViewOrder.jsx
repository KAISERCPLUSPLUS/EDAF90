function ViewOrder({shoppingCart}){
    return (
        <div className="row h-200 p-5 bg-light border rounded-3">
            <ol className="viewOrderList">
                {shoppingCart.map(item =>
                    <li key={item.uuid} className="orderItem">
                        <div>Sallad<p className="saladName"> &emsp;{item.get_desc()}</p></div>
                        <p className="price">{item.getPrice()} kr</p>
                    </li>)}
                {<li key="total" className="orderItem">
                    <b className="saladName">Total Price:</b>
                    <p className="price">{shoppingCart.reduce((accumulator, item) => accumulator + item.getPrice(), 0)} kr</p>
                </li>}
            </ol>

        </div>
    )
}
export default ViewOrder;