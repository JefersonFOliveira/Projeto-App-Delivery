import React from 'react';

function Login() {
  return (
    <div>
      <form>
        <img src="logo aqui" alt="login logo" />
        <div>
          <input
            type="email"
            placeholder="email@deliveryapp.com.br"
          />
          <input
            type="password"
            placeholder="********"
          />
        </div>
        <div>
          <button
            type="submit"
          >
            LOGIN
          </button>
          <button
            type="button"
          >
            Ainda não tenho conta
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
