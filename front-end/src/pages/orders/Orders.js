import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';
import getlocalStorage from '../../helpers/getStorage';
import OrderCard from '../../components/cards/orderCard';
import './Orders.css';

const OK = 200;

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const dbResult = await axios({
          method: 'get',
          url: 'http://localhost:3001/sales',
          headers: { Authorization: getlocalStorage('user').token },
        });
        if (dbResult.status === OK) setOrders(dbResult.data);
      } catch (err) {
        console.log(err.message);
        setOrders([]);
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Header />
      <div className="orders-container">
        {
          orders ? orders.map((item) => (
            <Link to={ `/customer/orders/${item.id}` } className="link" key={ item.id }>
              <OrderCard
                key={ item.id }
                status={ item.status || 'Pendente' }
                cardRole="customer"
                item={ item }
              />
            </Link>
          )) : null
        }
      </div>
    </div>
  );
}

export default Orders;
