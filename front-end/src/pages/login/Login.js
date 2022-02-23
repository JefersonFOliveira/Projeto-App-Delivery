import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validLogin } from '../../helpers/loginValidation';
import logo from '../../images/rockGlass.svg';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [warning, setWarning] = useState('none');

  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassWord(value);
  };

  const registerBtn = (e) => {
    e.preventDefault();
    navigate('/register');
  };

  const loginBtn = async (e) => {
    try {
      e.preventDefault();
      // verificação com o banco
    } catch (err) {
      // resposta do erro
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
