import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import HeaderTwo from '../../components/HeaderTwo';
import getLocalStorage from '../../helpers/getStorage';
import ItensTable from '../../components/itensTable';

function DetailSellersProducts() {
  const [info, setInfo] = useState({
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
      setStatus('preparando');
    } else {
      setStatus('em trânsito');
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
          {info.saleDate}
        </p>
        <p
          data-testid="seller_order_details__element-order-details-label-delivery-status"
        >
          {status}
        </p>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          disabled={ status !== 'pendente' }
          onClick={ changeTheStatus }
        >
          PREPARAR PEDIDOS
        </button>
        <button
          type="button"
          disabled={ status !== 'preparando' }
          onClick={ changeTheStatus }
          data-testid="seller_order_details__button-dispatch-check"
        >
          SAIU PARA ENTREGA
        </button>
      </div>
      <table>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quatidade</th>
          <th>Valor Unitário</th>
          <th>Sub-Total</th>
        </tr>
        {
          products.map((productOne) => (
            <ItensTable product={ productOne } key={ productOne.id } />
          ))
        }
      </table>
      <div>
        <p data-testid="seller_order_details__element-order-total-price">
          {info.totalPrice}
        </p>
      </div>
    </div>
  );
}

export default DetailSellersProducts;