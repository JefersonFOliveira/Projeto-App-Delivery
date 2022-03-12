import React from 'react';
import { Link } from 'react-router-dom';
import getLocalStorage from '../../helpers/getStorage';
// import './header.css';

function HeaderTwo() {
  const { name } = getLocalStorage('user');
  const logout = () => {
    localStorage.removeItem('user');
  };

  return (
    <header>
      <nav>
        <Link
          to="/seller/orders"
          className="orders"
          data-testid="customer_products__element-navbar-link-orders"
        >
          GERENCIAR USUÁRIOS
        </Link>
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
      </nav>
    </header>
  );
}

export default HeaderTwo;
