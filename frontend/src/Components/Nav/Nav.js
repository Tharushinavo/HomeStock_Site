import React from "react";
import { Link } from "react-router-dom";
import "./nav.css"; 

function Nav() {
    return (
        <nav>
            <ul className="Grocerylist-ul">
                <li className="Grocerylist-ll"> 
                    <Link to="/mainhome" className="home-a">Home</Link>
                </li>
                <li className="Grocerylist-ll">
                    <Link to="/Setting" className="home-a">Setting</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Nav;



