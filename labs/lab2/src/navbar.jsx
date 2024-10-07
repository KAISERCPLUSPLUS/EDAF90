import { NavLink, Link } from "react-router-dom";

export default function Navbar() {
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className="nav-link" to="/compose-salad">
                    Komponera en sallad
                </Link>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/view-order">
                    Se order
                </NavLink>
            </li>
        </ul>
    );
}