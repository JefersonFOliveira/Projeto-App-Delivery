const statusCode = require('../utilities/statusCodes');
const userService = require('../service/userService');

async function create(req, res) {
  try {
    const { name, email, password } = req.body;
    const { isRegistered, code, error, data } = await userService
    .createUser({ name, email, password });

    if (isRegistered) return res.status(code).json({ error });

    if (!isRegistered) return res.status(code).json(data);
  } catch (err) {
    return res.status(statusCode.NOT_FOUND).json({ error: err.message });
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
    return res.status(statusCode.NOT_FOUND).json({ error: err.message });
  }
}

async function getByRole(_req, res) {
  try {
    const { sellers, code } = await userService.getByRoleService();

    return res.status(code).json(sellers);
  } catch (err) {
    return res.status(statusCode.NOT_FOUND).json({ error: err.message });
  }
}

async function createByAdmin(req, res) {
  try {
    const { name, email, password, role } = req.body;
    
    if (role !== 'administrator') {
    return res.status(statusCode.UNAUTHORIZED).json({ message: 'Unauthorized' });
  }
    const { id } = await userService.createUser({ name, email, password });
    return res.status(statusCode.CREATED).json({ id, name, email, password });
  } catch (err) {
    return res.status(statusCode.NOT_FOUND).json({ error: err.message });
  }
}

module.exports = {
  create,
  login,
  getByRole,
  createByAdmin,
};