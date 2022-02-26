import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from '.';

export default function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassWord] = useState('');
  const [warning, setWarning] = useState('block');

  const context = {
    email,
    setEmail,
    password,
    setPassWord,
    warning,
    setWarning,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
