import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { validLogin } from '../../helpers/loginValidation';
import logo from '../../images/rockGlass.svg';
import hashMd5 from '../../helpers/hashMd5';
import getlocalStorage from '../../helpers/getStorage';
import './login.css';

const OK = 200;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [warning, setWarning] = useState('none');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassWord(value);
  };

  useEffect(() => {
    if (getlocalStorage('user')) {
      navigate('/customer/products');
    }
  }, [navigate]);

  const registerBtn = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const loginBtn = async (e) => {
    try {
      e.preventDefault();
      const hashPassword = hashMd5(password);
      const dbResult = await axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: { email, password: hashPassword },
      });

      if (dbResult.status === OK) {
        localStorage.setItem('user', JSON.stringify(dbResult.data));
        if (dbResult.data.role === 'customer') navigate('/customer/products');
        if (dbResult.data.role === 'administrator') navigate('/admin/manage');
        if (dbResult.data.role === 'seler') navigate('/seller/order');
      }
    } catch (err) {
      console.error(err.message);
      setWarning('block');
    }
  };

  return (
    <div className="loginComponent">
      <form className="loginForm">
        <img src={ logo } alt="login logo" />
        <div className="inputs">
          <input
            type="email"
            data-testid="common_login__input-email"
            placeholder="email@deliveryapp.com.br"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          <input
            type="password"
            data-testid="common_login__input-password"
            placeholder="********"
            name="password"
            value={ password }
            onChange={ handleChange }
          />
        </div>
        <div className="buttons">
          <button
            type="submit"
            data-testid="common_login__button-login"
            onClick={ loginBtn }
            disabled={ !validLogin(email, password) }
          >
            LOGIN
          </button>
          <button
            type="button"
            data-testid="common_login__button-register"
            onClick={ registerBtn }
          >
            Registre-se
          </button>
        </div>
      </form>
      <p
        id="warning"
        className="warning"
        data-testid="common_login__element-invalid-email"
        style={ { display: warning } }
      >
        Email ou Senha incorreta
      </p>
    </div>
  );
}

export default Login;
