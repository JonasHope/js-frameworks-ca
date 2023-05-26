import React from "react";
import CartIcon from "./CartIcon";
import { Link } from "react-router-dom";
import "../App.css";

function Header() {
  const itemCount = 5;

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/cartPage">
              <CartIcon itemCount={itemCount} />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
