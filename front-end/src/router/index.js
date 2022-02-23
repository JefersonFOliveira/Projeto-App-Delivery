import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/Login';

function Router() {
  return (
    <Routes>
      <Route exact path="/login" element={ <Login /> } />
    </Routes>
  );
}

export default Router;
