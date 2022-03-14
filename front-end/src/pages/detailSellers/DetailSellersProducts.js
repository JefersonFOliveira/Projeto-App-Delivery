import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import HeaderTwo from '../../components/HeaderTwo';
import getLocalStorage from '../../helpers/getStorage';
import ItensTable from '../../components/ItensTable';

function DetailSellersProducts() {
  const [info, setInfo] = useState({
    id: '',
    saleDate: '',
  });
  const [totalPrice, setTotalPrice] = useState('');
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
        setTotalPrice(dbResult.data.totalPrice);
        setInfo(dbResult.data);
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

  function changeTheStatus(e) {
    if (e.target.innerHTML === 'PREPARAR PEDIDOS') {
      setStatus('Preparando');
    } else {
      setStatus('Em Trânsito');
    }
  }

  return (
    <div>
      <HeaderTwo />
      <div>
        <p data-testid="seller_order_details__element-order-details-label-order-id">
          {info.id}
        </p>
        <p data-testid="seller_order_details__element-order-details-label-order-date">
          {moment(info.saleDate).format('DD/MM/yyyy')}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {status}
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ status.toLowerCase() !== 'pendente' }
          onClick={ changeTheStatus }
        >
          PREPARAR PEDIDOS
        </button>
        <button
          type="button"
          disabled={ status.toLowerCase() !== 'preparando' }
          onClick={ changeTheStatus }
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
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
              <ItensTable product={ productOne } key={ productOne.id } />
            ))
          }
        </tbody>
      </table>
      <div>
        <p data-testid="seller_order_details__element-order-total-price">
          {totalPrice.replace('.', ',')}
        </p>
      </div>
    </div>
  );
}

export default DetailSellersProducts;
