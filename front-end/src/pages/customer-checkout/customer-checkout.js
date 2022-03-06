import React, { useContext } from 'react';
import Header from '../../components/Header';
import Context from '../../context/index';

const fakecheckouts = [
  {
    item: 1,
    name: 'Coca-Cola',
    quantity: 1,
    price: 2.50,
    total: 10.50,
  },
  {
    item: 1,
    name: 'Pepsi-cola',
    quantity: 3,
    price: 13.50,
    total: 23.32,
  },
];

function CustomerCheckout() {
  const dataTestName = 'customer_checkout__element-order-table-';
  const total = fakecheckouts.reduce((acc, curr) => acc + curr.total, 0);
  // const user = JSON.parse(localStorage.getItem('user'));
  const { cart } = useContext(Context);
  console.log(cart, 'CARRINHO');

  const handleButtonCheckout = () => {
    alert('Checkout Successful');
  };
  return (
    <div>
      <Header />
      <main>
        <h1>Finalizar pedido</h1>
        <table className="checkout-container">
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
          {fakecheckouts.map((checkout, i) => (
            <tr key={ i }>
              <td
                data-testid={ `${dataTestName}item-number-${i}` }
              >
                {i + 1}
              </td>
              <td
                data-testid={ `${dataTestName}name-${i}` }
              >
                {checkout.name}
              </td>
              <td
                data-testid={ `${dataTestName}quantity-${i}` }
              >
                {checkout.quantity}
              </td>
              <td
                data-testid={ `${dataTestName}unit-price-${i}` }
              >
                {checkout.price}
              </td>
              <td
                data-testid={ `${dataTestName}sub-total-${i}` }
              >
                {checkout.total}
              </td>
              <td
                data-testid={ `${dataTestName}remove-${i}` }
              >
                <button
                  type="button"
                  onClick={ () => {
                    fakecheckouts.splice(i, 1);
                  } }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </table>
        <h2
          data-testid="customer_checkout__element-order-total-price"
        >
          { `Total: R$ ${total}` }
        </h2>
      </main>
      <form>
        <label htmlFor="seller">
          P. Vendedora Responsável
          <input
            type="text"
            id="seller"
            data-testid="customer_checkout__select-seller"
          />
        </label>
        <label htmlFor="address">
          Endereço
          <input
            type="text"
            id="address"
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="number">
          Número
          <input
            type="text"
            id="number"
            data-testid="customer_checkout__input-addressNumber"
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleButtonCheckout }
        >
          Finalizar pedido
        </button>
      </form>
    </div>
  );
}

export default CustomerCheckout;
