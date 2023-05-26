import React from "react";

function CartIcon({ itemCount }) {
  return (
    <div>
      <span className="cart-icon-overlay">Cart {itemCount}</span>
    </div>
  );
}

export default CartIcon;
