import React, { useState } from 'react';
import axios from 'axios';
import HeaderManager from '../../components/headerManager/HeaderManager';
import getlocalStorage from '../../helpers/getStorage';
import hashMd5 from '../../helpers/hashMd5';
import { validRegister } from '../../helpers/loginValidation';

// const CONFLICT = 409;

function Manager() {
  const [user, setUser] = useState([]);
  // const [warning, setWarning] = useState('none');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });

  console.log(user, data);
  const handleChange = ({ target: { name, value } }) => {
    setData({ ...data, [name]: value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const dbResult = await axios({
        method: 'post',
        url: 'http://localhost:3001/registration/admin',
        data: { ...data, password: hashMd5(data.password) },
        headers: { Authorization: getlocalStorage('user').token },
      });
      setUser((users) => [...users, dbResult.data]);
    } catch (err) {
      console.log(err.message);
      // if (err.response.status === CONFLICT) setWarning('block');
    }
  };

  return (
    <div>
      <HeaderManager />
      <div>
        <form onSubmit={ addUser }>
          <input
            type="text"
            name="name"
            data-testid="admin_manage__input-name"
            onChange={ handleChange }
            placeholder="Nome e sobrenome"
          />
          <input
            type="email"
            name="email"
            data-testid="admin_manage__input-email"
            onChange={ handleChange }
            placeholder="seu-email@site.com.br"
          />
          <input
            type="password"
            name="password"
            data-testid="admin_manage__input-password"
            onChange={ handleChange }
            placeholder="******"
          />
          <select
            name="role"
            data-testid="admin_manage__select-role"
            onChange={ handleChange }
          >
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
          <button
            type="submit"
            data-testid="admin_manage__button-register"
            disabled={ !validRegister(data.email, data.password, data.name) }
          >
            CADASTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Manager;
