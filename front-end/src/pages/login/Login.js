import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validLogin } from '../../helpers/loginValidation';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassWord(value);
  };

  const registerBtn = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  return (
    <div className="loginComponent">
      <form className="loginForm">
        <img src="../../images/rockGlass.svg" alt="login logo" />
        <div className="inputs">
          <input
            type="email"
            placeholder="email@deliveryapp.com.br"
            name="email"
            value={ email }
            onChange={ handleChange }
          />
          <input
            type="password"
            placeholder="********"
            name="password"
            value={ password }
            onChange={ handleChange }
          />
        </div>
        <div className="buttons">
          <button
            type="submit"
            disabled={ !validLogin(email, password) }
          >
            LOGIN
          </button>
          <button
            type="button"
            onClick={ registerBtn }
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
