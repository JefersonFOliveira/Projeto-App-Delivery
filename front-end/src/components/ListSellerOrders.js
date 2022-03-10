import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ListSellerOrders({ products }) {
  const { id, status, deliveryAddress, deliveryNumber, saleDate, totalPrice } = products;

  return (
    <div>
      <Link to={ `/seller/orders/${id}` }>
        <p data-testid={ `seller_orders__element-order-id-${id}` }>
          {id}
        </p>
        <p data-testid={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </p>
        <p data-testid={ `seller_orders__element-card-address-${id}` }>
          {`${deliveryAddress}, ${deliveryNumber}`}
        </p>
        <p data-testid={ `seller_orders__element-order-date-${id}` }>
          {moment(saleDate).format('DD/MM/yyyy')}
        </p>
        <p data-testid={ `seller_orders__element-card-price-${id}` }>
          {totalPrice.replace('.', ',')}
        </p>
      </Link>
    </div>
  );
}

ListSellerOrders.propTypes = {
  products: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};

export default ListSellerOrders;
