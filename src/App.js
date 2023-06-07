import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { styled } from 'styled-components';
import Header from './components/layout/Header';
import Cart from './pages/CartPage';
import Home from './pages/HomePage';
import Product from './pages/ProductPage';
import Checkout from './pages/CheckoutPage';
import Contact from './pages/ContactPage';
import Footer from './components/layout/Footer';

const StyledBrowsRouter = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <BrowserRouter>
      <StyledBrowsRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartPage" element={<Cart setCartCount={setCartCount}/>} />
        <Route path="/productPage/:productId" element={<Product setCartCount={setCartCount} />} />
        <Route path="/CheckoutPage" element={<Checkout />} />
        <Route path="/ContactPage" element={<Contact />} />
      </Routes>
      <Footer />
      </StyledBrowsRouter>
    </BrowserRouter>
  );
}

export default App;

