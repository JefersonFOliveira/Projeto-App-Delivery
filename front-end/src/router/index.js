import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login/Login';
import Register from '../pages/registration/registration';
import Products from '../pages/products/Products';
import Orders from '../pages/orders/Orders';
import CustomerCheckout from '../pages/customer-checkout/customer-checkout';
import SellerProducts from '../pages/seller/sellerProducts';
import DetailSellersProducts from '../pages/detailSellers/DetailSellersProducts';

function Router() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/customer/products" element={ <Products /> } />
      <Route exact path="/customer/orders" element={ <Orders /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/seller/orders" element={ <SellerProducts /> } />
      <Route
        exact
        path="/seller/orders/:id"
        component={ (props) => <DetailSellersProducts { ...props } /> }
      />
    </Routes>
  );
}

export default Router;
