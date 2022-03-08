import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListSellerOrders from '../../components/ListSellerOrders';
import getLocalStorage from '../../helpers/getStorage';
import HeaderTwo from '../../components/HeaderTwo';

function SellerProducts() {
  const [productsSeller, setProductsSeller] = useState([]);
  const [nameRole, setNameAndRole] = useState({});

  useEffect(() => {
    async function api() {
      const { token, role, name } = getLocalStorage('user');
      const dbResult = await axios({
        method: 'get',
        url: 'http://localhost:3001/sellers/',
        auth: token,
      });
      setNameAndRole({ name, role });
      const ok = 200;
      if (dbResult.status === ok) {
        setProductsSeller(dbResult.data);
      }
    }
    api();
  }, []);

  return (
    <div>
      <HeaderTwo name={ nameRole.name } role={ nameRole.role } />
      {
        productsSeller.map((product) => (
          <ListSellerOrders products={ product } key={ product.id } />
        ))
      }
    </div>
  );
}

export default SellerProducts;
