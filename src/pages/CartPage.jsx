import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductPrice from "../components/Price";

const Cart = ({ setCartCount }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0.00");

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.map((item) => ({
      ...item,
      totalPrice: item.discountedPrice * item.quantity || 0,
    }));
    setCart(updatedCart);

    const initialTotalPrice = updatedCart.reduce(
      (accumulator, item) =>
        Number.isFinite(item.totalPrice)
          ? accumulator + item.totalPrice
          : accumulator,
      0
    );
    setTotalPrice(initialTotalPrice.toFixed(2));
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartCount(updatedCart.length);

    const updatedTotalPrice = updatedCart.reduce(
      (accumulator, item) =>
        Number.isFinite(item.totalPrice)
          ? accumulator + item.totalPrice
          : accumulator,
      0
    );
    setTotalPrice(updatedTotalPrice.toFixed(2));
  };

  return (
    <div>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((product) => (
            <div className="cart-item" key={product.id}>
              <h2>{product.title}</h2>
              <ProductPrice
                discountedPrice={product.discountedPrice}
                price={product.price}
              />
              <button onClick={() => handleRemoveFromCart(product.id)}>
                Remove from cart
              </button>
            </div>
          ))}
          <div className="total-price">Total Price: ${totalPrice}</div>
          <Link to="/checkout">
            <button>Proceed to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
