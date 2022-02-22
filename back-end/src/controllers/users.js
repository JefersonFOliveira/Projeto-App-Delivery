const usersService = require('../services/users');
const { generateToken } = require('../auth/jwt');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersService.login(email, password);
    if (!user) return res.status(401).json({ message: 'invalid credintials' });
    const token = generateToken(user);

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    await usersService.create(name, email, password);

    return res.status(201).json({ message: 'User registred ' });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = {
  login,
  create,
};
