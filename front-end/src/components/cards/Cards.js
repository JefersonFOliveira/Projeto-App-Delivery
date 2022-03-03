import React from 'react';

import './cards.css';

function Header() {
  const { price, image, name, id } = products;
  const [quantity, setQuantity] = useState(0);
  return (
    <div>
      <div>
        <span
          className="price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$ ${price}`}
        </span>
        <img
          className="image"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ image }
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

export default Header;
