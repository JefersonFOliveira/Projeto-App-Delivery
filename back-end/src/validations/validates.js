const { HTTP_SERVER_ERROR } = require('../middlewares/status');

const validEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validateRegistration = (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!validEmail(email) || password.length < 6 || name.length < 12) {
      throw new Error('invalid data');
    } else {
      next();
    }
  } catch (err) {
    return res.status(HTTP_SERVER_ERROR).json({ error: err.message });
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validEmail(email) || password.length < 6) {
      throw new Error('invalid data');
    } else {
      next();
    }
  } catch (err) {
    return res.status(HTTP_SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
};