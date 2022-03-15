import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import TableHeader from '../../components/tableHeader/TableHeader';
import Context from '../../context/index';
import priceFormat from '../../helpers/priceFormat';

function CustomerCheckout() {
  const navigate = useNavigate();
  const dataTestName = 'customer_checkout__element-order-table-';
  const [sellers, setSellers] = useState([]);
  const [currSeller, setCurrSeller] = useState(2);
  const { cart, totalCart, setCart, setTotalCart } = useContext(Context);
  const [userState, setUserState] = useState({});
  const [userAddress, setUserAddress] = useState({});

  const removeItem = (id) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  useEffect(() => {
    let sumPrice = 0.00;
    const result = cart.map(({ totalPrice }) => {
      const sumPriceItem = sumPrice + parseFloat(totalPrice);
      sumPrice = sumPriceItem;
      return sumPrice;
    });
    setTotalCart(result[result.length - 1]);
  }, [cart, setTotalCart]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/login');
    }
    setUserState(user);

    const getAllSellers = async () => {
      try {
        const { data } = await axios({
          method: 'get',
          url: 'http://localhost:3001/sellers',
          headers: { Authorization: user.token },
        });
        setSellers(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getAllSellers();
  }, [cart]);

  const submitOrder = async (e) => {
    e.preventDefault();
    try {
      const dbResult = await axios({
        method: 'post',
        url: 'http://localhost:3001/sales',
        headers: { Authorization: userState.token },
        data: {
          userId: userState.id,
          sellerId: currSeller,
          products: cart,
          totalPrice: totalCart,
          deliveryAddress: userAddress.address,
          deliveryNumber: userAddress.number,
        },
      });
      return navigate(`/customer/orders/${dbResult.data}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleButtonCheckout = () => {
  //   alert('Checkout Successful');
  // };
  return (
    <div>
      <Header />
      <main>
        <h1>Finalizar pedido</h1>
        <table className="checkout-container">
          <thead>
            <TableHeader />
          </thead>
          <tbody>
            {cart.map((item, indice) => (
              <tr key={ indice }>
                <td
                  data-testid={ `${dataTestName}item-number-${indice}` }
                >
                  {indice + 1}
                </td>
                <td
                  data-testid={ `${dataTestName}name-${indice}` }
                >
                  {item.name}
                </td>
                <td
                  data-testid={ `${dataTestName}quantity-${indice}` }
                >
                  {item.quantity}
                </td>
                <td
                  data-testid={ `${dataTestName}unit-price-${indice}` }
                >
                  {` R$ ${item.price.replace('.', ',')}` }
                </td>
                <td
                  data-testid={ `${dataTestName}sub-total-${indice}` }
                >
                  {` R$ ${item.totalPrice.replace('.', ',')}` }
                </td>
                <td
                  data-testid={ `${dataTestName}remove-${indice}` }
                >
                  <button
                    type="button"
                    onClick={ removeItem.bind(this, item.id) }
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          { priceFormat(totalCart) }
        </h2>
      </main>
      <form onSubmit={ submitOrder }>
        <label htmlFor="sellers">
          P. Vendedora Responsável
          {
            sellers.length && (
              <select
                id="sellers"
                data-testid="customer_checkout__select-seller"
                defaultValue={ 2 }
                onChange={ ({ target }) => setCurrSeller(Number(target.value)) }
              >
                { sellers.map((seller, index) => (
                  <option
                    key={ index }
                    value={ seller.id }
                  >
                    { seller.name }
                  </option>
                ))}
              </select>
            )
          }
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
            onChange={
              ({ target }) => setUserAddress({ ...userAddress, address: target.value })
            }
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="text"
            id="number"
            data-testid="customer_checkout__input-addressNumber"
            onChange={
              ({ target }) => setUserAddress({ ...userAddress, number: target.value })
            }
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ submitOrder }
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

export default CustomerCheckout;
