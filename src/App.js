import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Cart from './pages/CartPage';
import Home from './pages/HomePage';
import Product from './pages/ProductPage';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="cartPage" element={<Cart />} />
        <Route path="ProductPage" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
