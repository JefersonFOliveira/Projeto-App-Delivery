const {
  HTTP_SERVER_ERROR,
  HTTP_BAD_REQUEST,
} = require('../middlewares/status');

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

const validateName = (req, res) => {
  try {
    const { name } = req.body;

    if (name.length < 12) {
      return res
        .status(HTTP_BAD_REQUEST)
        .json({ message: '"name" length must be 12 characters long' });
    }
  } catch (err) {
    return res.status(HTTP_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateName,
};
