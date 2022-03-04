const { User } = require('../../database/models');

const findByRole = (role) => User.findAll({ where: { role } });

const findByEmail = (email) => User.findOne({ where: { email }, raw: true });

const create = (name, email, password, role) => User.create({ name, email, password, role });

module.exports = {
  findByEmail,
  create,
  findByRole,
};