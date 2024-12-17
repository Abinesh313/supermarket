// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx';
import Layout from './pages/Layout.jsx';
import AdminPage from './pages/Admin/AdminPage.jsx';
import Home from './pages/Components/Home.jsx';
import UserPage from './pages/Users/UserPage.jsx';
import Product from './pages/Product/Product.jsx';
import Cart from './pages/Product/Cart.jsx';
import { CartProvider } from './pages/Product/CartContext.jsx'; // Ensure this path is correct
import Fruits from './pages/Product/Fruits.jsx';
import Vegetables from './pages/Product/Vegetables.jsx';
import Dairy from './pages/Product/Dairy.jsx';
import Checkout from './pages/Product/Checkout.jsx';
import OrderSuccess from './pages/Product/Success.jsx';
import AddProduct from './pages/Admin/AddProduct.jsx';
import ProtectedRoute from './pages/PrivateRoute.jsx'; // Ensure this path is correct
import Contact from './pages/Components/Contact.jsx';

function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login isSignUp={true} />} />
        <Route path="/admin" element={<AdminPage />}  />
        <Route path="/home" element={<Home />} />
        <Route path="/user" element={<ProtectedRoute element={<UserPage />} />} />
        <Route path="/product" element={<ProtectedRoute element={<Product />} />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/ordersuccess" element={<OrderSuccess />} />
        <Route path="/addproduct" element={<ProtectedRoute element={<AddProduct />} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
