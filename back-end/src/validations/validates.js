const status = require('../utilities/statusCodes');

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

const validateNamePassword = (name, password) => {
  if (!name || !password) {
    return 'Password and name required';
  }
  if (password.length < 6) {
    return 'Password length must be at least 6 characters long';
  }
  if (name.length < 12) {
    return 'Name length must be at least 12 characters long';
  }
  return false;
};

const validateRegistration = (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    const message = validateNamePassword(name, password);

    if (message) {
      return res.status(status.BAD_REQUEST)
        .json({ error: message });
    }

    if (!validateEmail(email)) {
      return res.status(status.BAD_REQUEST)
        .json({ error: 'Invalid email' });
    }

    next();
  } catch (err) {
    return res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

const validateLogin = (req, res, next) => {
  try {
    const { email, password } = req.body;

    const message = validateNamePassword('placeholderName', password);

    if (message) {
      return res.status(status.BAD_REQUEST)
        .json({ error: message });
    }

    if (!validateEmail(email)) {
      return res.status(status.BAD_REQUEST)
        .json({ error: 'Invalid email' });
    }

    next();
  } catch (err) {
    return res.status(status.SERVER_ERROR).json({ error: err.message });
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
};
