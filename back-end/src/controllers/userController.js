const status = require('../utilities/statusCodes');
const userService = require('../service/userService');

async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    const { isRegistered, code, error, data } = await userService
    .createUser({ name, email, password });

    if (isRegistered) return res.status(code).json({ error });

    if (!isRegistered) return res.status(code).json(data);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { notFound, invalidPassword, code, error, data } = await userService
    .loginService({ email, password });

    if (notFound) return res.status(code).json({ error });

    if (invalidPassword) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

module.exports = {
  create,
  login,
};