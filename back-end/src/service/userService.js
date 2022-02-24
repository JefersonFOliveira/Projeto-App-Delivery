const { User } = require('../database/models');
const { createToken } = require('../validations/validadeJWT');
const status = require('../utilities/statusCodes');

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function createUser({ name, email, password }) {
  const userResgistered = await getUserByEmail(email);
  const role = 'customer';

  if (userResgistered) {
    return { isRegistered: true, code: status.CONFLICT, error: 'User already registered' };
  }

  const user = await User.create({ name, email, password, role });

  const userLogin = { name, email, role };
  const token = await createToken(userLogin);
  const data = { name, email, role, token, id: user.dataValues.id };

  return { data, code: status.CREATED };
}

async function loginService({ password, email }) {
  const userResgistered = await getUserByEmail(email);

  if (!userResgistered) {
    return { notFound: true, code: status.NOT_FOUND, error: 'User dont exists' };
  }

  if (password !== userResgistered.password) {
    return { invalidPassword: true, code: status.NOT_FOUND, error: 'Invalid data' };
  }

  const { name, role } = userResgistered;
  const userLogin = { name, role, email };
  const token = await createToken(userLogin);
  const data = { name, email, role, token, id: userResgistered.dataValues.id };

  return { data, code: status.OK };
}

module.exports = {
  createUser,
  loginService,
};