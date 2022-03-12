import React from 'react';
import { Link } from 'react-router-dom';
import getLocalStorage from '../helpers/getStorage';
// import './header.css';

function Header() {
  const { name } = getLocalStorage('user');

  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <header>
      <nav>
        <Link
          to="/customer/products"
          className="products"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </Link>
        <Link
          to="/customer/orders"
          className="orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </Link>
      </nav>
      <p
        className="name"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </p>
      <Link
        to="/login"
        className="logout"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ logout }
      >
        Sair
      </Link>
    </header>
  );
}

export default Header;
