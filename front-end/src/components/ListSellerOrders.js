import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ListSellerOrders({ products }) {
  const { id, status, deliveryAddress, deliveryNumber, saleDate, totalPrice } = products;
  const limit = 10;
 
  return (
    <div>
      <Link to={ `/seller/orders/${id}` }>
        <p data-testi={ `seller_orders__element-order-id-${id}` }>
          {id}
        </p>
        <p data-testi={ `seller_orders__element-delivery-status-${id}` }>
          {status}
        </p>
        <p data-testi={ `seller_orders__element-card-address-${id}` }>
          {`${deliveryAddress}, ${deliveryNumber}`}
        </p>
        <p data-testi={ `seller_orders__element-order-date-${id}` }>
          {saleDate.slice(0, limit)}
        </p>
        <p data-testi={ `seller_orders__element-card-price-${id}` }>
          {totalPrice}
        </p>
      </Link>
    </div>
  );
}

ListSellerOrders.propTypes = {
  products: PropTypes.objectOf({
    id: PropTypes.number,
    status: PropTypes.string,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};

export default ListSellerOrders;
