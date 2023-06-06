import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function CartIcon({ itemCount }) {
  return (
    <div>
      <span>{itemCount} </span>
      <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
    </div>
  );
}

export default CartIcon;
