import React from 'react';
import PropTypes from 'prop-types';

function ItensTable({ product }) {
  const { id, name, price, quantityTotal } = product;
  const total = Number(quantityTotal.quantity) * Number(price);
  
  return (
    <tr>
      <td data-testid={ `seller_order_details__element-order-table-item-number-${id}` }>
        {id}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-name-${id}` }>
        {name}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-quantity-${id}` }>
        {quantityTotal.quantity}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-unit-price-${id}` }>
        {price}
      </td>
      <td data-testid={ `seller_order_details__element-order-table-sub-total-${id}` }>
        {total}
      </td>
    </tr>
  );
}

ItensTable.propTypes = {
  product: PropTypes.objectOf({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantityTotal: PropTypes.objectOf({
      quantity: PropTypes.string,
    }),
  }).isRequired,
};

export default ItensTable;
