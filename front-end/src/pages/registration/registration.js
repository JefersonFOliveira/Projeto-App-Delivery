import React, { useEffect, useState } from 'react';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonDisabled, enbaleButton] = useState(true);
  const [logged, setLogged] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const regex = /[a-z0-9]+@[a-z]+\.[a-z]{3}/;
    const minLength = 6;
    const nameLength = 12;

    if(password.length >= minLength && regex.test(email) && name.length >= nameLength) {
      enbaleButton(false);
    } else {
      enbaleButton(true);
    }
  }, [password, email, name]);

  return (
    <div>Registrar</div>
  );
}

export default Register;
