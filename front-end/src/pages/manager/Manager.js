import React, { useState } from 'react';
import HeaderTwo from '../../components/HeaderTwo';
import getlocalStorage from '../../helpers/getStorage';

function Manager() {
  const { role, name } = getlocalStorage('user');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'seller',
  });
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const dbResult = await axios({
  //         method: 'get',
  //         url: 'http://localhost:3001/users/all',
  //         headers: { Authorization: getlocalStorage('user').token },
  //       });
  //       if (dbResult.status === OK) setUser(dbResult.data);
  //     } catch (err) {
  //       console.log(err.message);
  //       setUser([]);
  //     }
  //   };
  //   fetch();
  // }, []);

  return (
    <div>
      <HeaderTwo name={ name } role={ role } />
      manager
    </div>
  );
}

export default Manager;
