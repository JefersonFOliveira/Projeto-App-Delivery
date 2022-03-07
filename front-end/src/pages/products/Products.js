import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Cards from '../../components/cards/Cards';
import priceFormat from '../../helpers/priceFormat';
import getlocalStorage from '../../helpers/getStorage';
import Context from '../../context/index';
import './products.css';

const OK = 200;

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cart, setTotalCart } = useContext(Context);
  const [sumCartPrice, setSumCartPrice] = useState(0);

  useEffect(() => {
    let priceCart = 0.00;
    const result = cart.map(({ totalPrice }) => {
      const sumPrice = priceCart + parseFloat(totalPrice);
      priceCart = sumPrice;
      return sumPrice;
    });

    priceCart = ((result[result.length - 1] * 100) / 100);
    setSumCartPrice(priceCart);
    setTotalCart(sumCartPrice);
  }, [cart, setTotalCart, sumCartPrice]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dbResult = await axios({
          method: 'get',
          url: 'http://localhost:3001/products',
          headers: { Authorization: getlocalStorage('user').token },
        });
        if (dbResult.status === OK) setProducts(dbResult.data);
      } catch (err) {
        console.log(err.message);
        setProducts([]);
      }
    };
    fetch();
  }, []);

  const buttonDesable = () => cart.length === 0;

  return (
    <div>
      <Header />
      <div>
        { products.map((product, index) => (
          <Cards
            products={ product }
            key={ index }
            index={ index }
          />
        ))}
      </div>
      <div className="BtnPosition">
        <button
          type="button"
          className="btnCart"
          data-testid="customer_products__button-cart"
          onClick={ () => navigate('/customer/checkout') }
          disabled={ buttonDesable() }
        >
          Ver Carrinho: R$
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {sumCartPrice ? priceFormat(sumCartPrice) : '0,00'}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Products;
