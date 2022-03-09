import React from 'react';
import HeaderTwo from '../../components/HeaderTwo';
import getlocalStorage from '../../helpers/getStorage';

function Manager() {
  const { role, name } = getlocalStorage('user');
  return (
    <div>
      <HeaderTwo name={ name } role={ role } />
      manager
    </div>
  );
}

export default Manager;
