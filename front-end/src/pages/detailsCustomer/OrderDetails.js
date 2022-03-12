import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import getLocalStorage from '../../helpers/getStorage';
import OrderItemsTable from '../../components/OrderItemsTable';

const longTest = 'customer_order_details__element-order-details-label-delivery-status';

function DetailSellersProducts() {
  const [order, setOrder] = useState({
    id: '',
    saleDate: '',
  });
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function api() {
      const { token } = getLocalStorage('user');
      const dbResult = await axios({
        method: 'get',
        url: `http://localhost:3001/sales/${id}`,
        headers: { Authorization: token },
      });

      const ok = 200;
      if (dbResult.status === ok) {
        setStatus(dbResult.data.status);
        setOrder(dbResult.data);
        setProducts(dbResult.data.products);
      }
    }
    api();
  }, [id]);

  useEffect(() => {
    async function updateApi() {
      if (status !== 'pendente') {
        const dbResult = await axios({
          method: 'put',
          url: `http://localhost:3001/sellers/orders/${id}`,
          data: { statusOrder: status },
        });
        const ok = 200;
        if (dbResult.status === ok) {
          console.log('atualizado com sucesso');
        }
      }
    }
    updateApi();
  }, [status, id]);

  function changeTheStatus() {
    setStatus('ENTREGUE');
  }

  return (
    <div>
      <Header />
      {
        order.id && (
          <main>
            <div>
              <span
                data-testid="customer_order_details__element-order-details-label-order-id"
              >
                {`Pedido ${String(order.id)}`}
              </span>
              <span
                data-testid={
                  `customer_order_details__element-order-details-label-seller-name${''}`
                }
              >
                {order.seller.name}
              </span>
              <span
                data-testid={
                  `customer_order_details__element-order-details-label-order-date${''}`
                }
              >
                {moment(order.saleDate).format('DD/MM/YYYY')}
              </span>
              <span
                data-testid={ longTest }
              >
                { order.status }
              </span>
              <button
                type="button"
                disabled={ !order.status.includes('Em Trânsito') }
                onClick={ changeTheStatus }
                data-testid="customer_order_details__button-delivery-check"
              >
                Marcar como entregue
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Descrição</th>
                  <th>Quatidade</th>
                  <th>Valor Unitário</th>
                  <th>Sub-Total</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((productOne) => (
                    <OrderItemsTable product={ productOne } key={ productOne.id } />
                  ))
                }
              </tbody>
            </table>
            <div>
              <p data-testid="customer_order_details__element-order-total-price">
                { order.totalPrice.replace('.', ',') }
              </p>
            </div>
          </main>
        )
      }
    </div>
  );
}

export default DetailSellersProducts;
