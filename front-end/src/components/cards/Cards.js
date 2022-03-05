import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import priceFormat from '../../helpers/priceFormat';
import Context from '../../context/index';
import './cards.css';

function Cards({ products }) {
  const { price, urlimage, name, id } = products;
  const [quantity, setQuantity] = useState(0);
  const { cart, setCart } = useContext(Context);

  useEffect(() => {
    const itensCard = cart.find((item) => item.id === id);
    if (itensCard) {
      setQuantity(itensCard.quantity);
    } else {
      setQuantity(0);
    }
  }, [cart]);

  useEffect(() => {
    const itemCart = cart.find((item) => item.id === id);
    if (!itemCart) {
      const totalPrice = (parseFloat(price) * quantity).toFixed(2);
      return setCart([...cart, { price, urlimage, name, id, quantity, totalPrice }]);
    }
    if (itemCart) {
      itemCart.totalPrice = (parseFloat(price) * quantity).toFixed(2);
      itemCart.quantity = quantity;
      setCart([...cart]);
    }
    if (itemCart.quantity <= 0) {
      const newItemCart = cart.filter((item) => item.id !== id);
      return setCart(newItemCart);
    }
  }, [quantity]);

  useEffect(() => {
    setCart([...cart]);
  }, []);

  const btnAdd = () => {
    setQuantity(quantity + 1);
  };

  const btnRemove = () => {
    if (quantity >= 1) setQuantity(quantity - 1);
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
      >
        -
      </button>
      <input
        className="quantity"
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        value={ quantity }
        onChange={ ({ target }) => setQuantity(target.value) }
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
