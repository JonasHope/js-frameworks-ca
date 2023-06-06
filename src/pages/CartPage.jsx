import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductPrice from "../components/Price";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../styles/buttons";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItem = styled.div`
  background-color: aqua;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  box-shadow: 0px 15px 10px -15px #ccc;
`;

const ProductContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

const ProductsContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: auto;
  flex-wrap: wrap;
`;

const Total = styled.div`
  padding: 10px;
  margin: 10px;
  font-weight: bold;
`;

const RemoveButton = styled.button`
  border: none;
  background-color: inherit;
  font-size: 20px;
  justify-content: flex-end;
  cursor: pointer;
  padding: 5px;
  margin: 5px;
`;

const H2 = styled.h2`
  margin: 0px;
  font-size: 1em;
`;

const StylingPrice = styled.div`
  ;
`;

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

  const handleClearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    setCartCount(0);
    setTotalPrice("0.00");
  };

  return (
    <CartContainer>
      <h1>Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ProductsContainer>
            {cart.map((product) => (
              <CartItem key={product.id}>
                <RemoveButton onClick={() => handleRemoveFromCart(product.id)}>
                  <FontAwesomeIcon icon={faRemove}></FontAwesomeIcon>
                </RemoveButton>
                <ProductContent>
                  <H2>{product.title}</H2>
                  <StylingPrice>
                    <ProductPrice
                      discountedPrice={product.discountedPrice}
                      price={product.price}
                    />
                  </StylingPrice>
                </ProductContent>
              </CartItem>
            ))}
          </ProductsContainer>
          <Total>Total Price: ${totalPrice}</Total>
          <Link to="/checkoutPage">
            <PrimaryButton onClick={handleClearCart}>
              Proceed to Checkout
            </PrimaryButton>
          </Link>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
