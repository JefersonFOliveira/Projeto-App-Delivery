import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/registration/registration';
import Products from '../pages/products/Products';
import Orders from '../pages/orders/Orders';
import CustomerCheckout from '../pages/customer-checkout/customer-checkout';

function Router() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
    </Routes>
  );
}

export default Router;
