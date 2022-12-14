import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './orderCard.css';
import priceFormat from '../../helpers/priceFormat';

function OrderCard({ status, cardRole, item }) {
  const date = moment(item.saleDate).format('DD/MM/YYYY');

  return (
    <div className="order-card">
      <div className="pedido">
        <span className="small-text">Pedido</span>
        <span
          data-testid={ `${cardRole}_orders__element-order-id-${item.id}` }
        >
          {item.id}
        </span>
      </div>
      <div className="adress-container">
        <div className="adress-container-top h-145">
          <div
            className={ status.toLowerCase() }
            data-testid={ `${cardRole}_orders__element-delivery-status-${item.id}` }
          >
            {status}
          </div>
          <div className="third-block">
            <span data-testid={ `${cardRole}_orders__element-order-date-${item.id}` }>
              { date }
            </span>
            <span
              data-testid={ `${cardRole}_orders__element-card-price-${item.id}` }
            >
              {` R$ ${priceFormat(item.totalPrice)}` }
            </span>
          </div>
        </div>
        <div
          data-testid="seller_orders__element-card-address-<id>"
          className="small-text d-none"
        />
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  status: PropTypes.string.isRequired,
  cardRole: PropTypes.string.isRequired,
  item: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
    id: PropTypes.number,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
    sellerName: PropTypes.string,
    status: PropTypes.string,
    totalPrice: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.number,
    user_id: PropTypes.number,
  }).isRequired,
};

export default OrderCard;
