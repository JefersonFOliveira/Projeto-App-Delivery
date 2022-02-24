const { User } = require('../database/models');
const { createToken } = require('../validations/validadeJWT');
const {
  HTTP_CREATED,
  HTTP_CONFLICT,
  HTTP_OK_STATUS,
  HTTP_NOT_FOUND } = require('../middlewares/status');

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function createUser({ name, email, password }) {
  const userResgistered = await getUserByEmail(email);
  const role = 'customer';

  if (userResgistered) {
    return { isRegistered: true, code: HTTP_CONFLICT, error: 'User already registered' };
  }

  const user = await User.create({ name, email, password, role });

  const userLogin = { name, email, role };
  const token = await createToken(userLogin);
  const data = { name, email, role, token, id: user.dataValues.id };

  return { data, code: HTTP_CREATED };
}

async function loginService({ password, email }) {
  const userResgistered = await getUserByEmail(email);

  if (!userResgistered) {
    return { notFound: true, code: HTTP_NOT_FOUND, error: 'User dont exists' };
  }

  if (password !== userResgistered.password) {
    return { invalidPassword: true, code: HTTP_NOT_FOUND, error: 'Invalid data' };
  }

  const { name, role } = await getUserByEmail(email);
  const userLogin = { name, role, email };
  const token = createToken(userLogin);
  const data = { name, email, role, token, id: userResgistered.dataValues.id };

  return { data, code: HTTP_OK_STATUS };
}

async function getByRoleService() {
  const sellers = await User.findAll({ where: { role: 'seller' } });

  return { sellers, code: HTTP_OK_STATUS };
}

module.exports = {
  createUser,
  loginService,
  getByRoleService,
};