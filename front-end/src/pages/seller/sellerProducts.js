import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListSellerOrders from '../../components/ListSellerOrders';
import getLocalStorage from '../../helpers/getStorage';
import HeaderTwo from '../../components/HeaderTwo';

function SellerProducts() {
  const [productsSeller, setProductsSeller] = useState([]);

  useEffect(() => {
    async function api() {
      const { token, id } = getLocalStorage('user');
      const dbResult = await axios({
        method: 'get',
        url: `http://localhost:3001/sellers/orders/${id}`,
        headers: { Authorization: token },
      });

      const ok = 200;
      if (dbResult.status === ok) {
        setProductsSeller(dbResult.data);
      }
    }
    api();
  }, []);

  return (
    <div>
      <HeaderTwo />
      {
        productsSeller.map((product) => (
          <ListSellerOrders products={ product } key={ product.id } />
        ))
      }
    </div>
  );
}

export default SellerProducts;
