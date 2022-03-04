import React, { useState } from 'react';
import PropTypes from 'prop-types';
import priceFormat from '../../helpers/priceFormat';
// import Context from '../../context/index';
import './cards.css';

function Cards({ products }) {
  const { price, urlimage, name, id } = products;
  const [quantity, setQuantity] = useState(0);
  // const { cart, setCart } = useContext(Context);

  const btnAdd = () => {
    setQuantity(quantity + 1);
  };

  const btnRemove = () => {
    setQuantity(quantity - 1);
  };

  const quantityChosen = () => {
    // const sumValues = +value;
  };

  return (
    <div className="productCard">
      <div>
        <span
          className="price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${priceFormat(price)}`}
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
        onClick={ btnRemove }
        disabled={ quantity === 0 }
      >
        -
      </button>
      <input
        className="quantity"
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ quantityChosen }
      />
      <button
        className="btnadd"
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ btnAdd }
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
