import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function HeaderTwo({ name, role }) {
  const nameAndLink = (r) => {
    switch (r) {
    case 'customer':
      return { link: '/', name: 'MEUS PEDIDOS' };
    case 'administrator':
      return { link: '/', name: 'GERENCIAR USUÁRIOS' };
    case 'seller':
      return { link: '/seller/orders', name: 'PEDIDOS' };
    default:
      return { link: '/', name: 'voltar' };
    }
  };

  const link11 = () => {
    if (role === 'customer') {
      return (
        <Link to="/customer/products" data-testi="customer_products__element-navbar-link-products">
          PRODUTOS
        </Link>
      );
    }
  };

  return (
    <header>
      <nav>
        { link11() }
        <Link
          to={ nameAndLink(role).link }
          data-testi="customer_products__element-navbar-link-orders"
        >
          { nameAndLink(role).name }
        </Link>
        <p data-testi="customer_products__element-navbar-user-full-name">{ name }</p>
        <Link
          to="/"
          data-testi="customer_products__element-navbar-link-logout"
          onClick={ () => {
            localStorage.removeItem('user');
          } }
        >
          Sair
        </Link>
      </nav>
    </header>
  );
}

HeaderTwo.propTypes = {
  name: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
export default HeaderTwo;
