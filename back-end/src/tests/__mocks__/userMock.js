const SequelizeMock = require('sequelize-mock');
const dbMock = new SequelizeMock();

const userMock = dbMock.define('User', {
  id: 1,
  name: 'Delivery App Admin',
  email: 'adm@deliveryapp.com',
  password: 'a4c86edecc5aee06eff8fdeda69e0d04',
  role: 'administrator',
});

userMock.$queryInterface.$useHandler((query, queryOptions, done) => {
  if (query === 'findOne') {
    const where = queryOptions[0].where;

    const user = userMock.build({
      id: 1,
      name: 'Delivery App Admin',
      email: 'adm@deliveryapp.com',
      password: 'a4c86edecc5aee06eff8fdeda69e0d04',
      role: 'administrator',
    });

    if (where.email === user.email) return user;
    return null;
  };

  if (query === 'findAll') {
    const where = queryOptions[0].where;

    const users = [];

    for (let x = 0; x < 3; x++) {
      users.push(userMock.build({
        id: x,
        name: 'name user ' + x,
        email: `email${x}@example.com`,
        password: 'a4c86edecc5aee06eff8fdeda69e0d0' + x,
      }));
    };

    users[0].role = 'administrator';
    users[1].role = 'seller';
    users[2].role = 'customer';

    for (let user of users) {
      if (where.role === user.role) {
        return user;
      };
    };

    return null;
  };
});

module.exports = { User: userMock };