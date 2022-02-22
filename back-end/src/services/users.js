const { User } = require('../database/models');

const login = async (email, password) => {
  const user = await User.findOne({ where: { email }, raw: true });

  if (!user || user.password !== password) return null;
  delete user.password;
  return user;
};

const create = async (name, email, password) => {
  const role = 'customer';
  await User.create({ name, email, password, role });
};

module.exports = {
  login,
  create,
};
