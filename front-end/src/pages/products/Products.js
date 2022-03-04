import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import Cards from '../../components/cards/Cards';
import priceFormat from '../../helpers/priceFormat';
import getlocalStorage from '../../helpers/getStorage';

const OK = 200;

function Products() {
  const [products, setProducts] = useState([]);

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
      <div className="cart">
        <button
          type="button"
          className="btnCart"
          to="/customer/checkout"
          data-testid="customer_products__checkout-buttom-cart"
        >
          Ver Carrinho:
          {' '}
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {`R$ ${priceFormat()}`}
          </span>
        </button>
      </div>
    </div>
  );
}

export default Products;
