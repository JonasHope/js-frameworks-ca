import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/CartPage';
import Home from './pages/HomePage';
import Product from './pages/ProductPage';
import Checkout from './pages/CheckoutPage';

function App() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(storedCart.length);
  }, []);

  return (
    <BrowserRouter>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cartPage" element={<Cart setCartCount={setCartCount}/>} />
        <Route path="/productPage/:productId" element={<Product setCartCount={setCartCount} />} />
        <Route path="/CheckoutPage" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

