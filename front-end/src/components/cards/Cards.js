import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './cards.css';

function Cards({ products }) {
  const { price, urlimage, name, id } = products;
  const [quantity, setQuantity] = useState(0);
  return (
    <div>
      <div>
        <span
          className="price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {price}
        </span>
        <img
          className="image"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlimage }
          alt={ `${name}` }
        />
      </div>
      <p
        data-testid={ `customer_products__element-card-title-${id}` }
      >
        {name}
      </p>
      <button
        className="btnrm"
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
      >
        -
      </button>
      <input
        className="quantity"
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
      />
      <button
        className="btnadd"
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +
      </button>
    </div>
  );
}

Cards.propTypes = {
  products: PropTypes.shape({
    name: PropTypes.string,
    urlimage: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default Cards;
