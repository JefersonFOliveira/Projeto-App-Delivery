const { readFileSync } = require('fs');
const jwt = require('jsonwebtoken');

const SECRET = './jwt.evaluation.key';
const TOKEN_SECRET = readFileSync(SECRET, 'utf-8').replace('\n', '');

const jwtConfig = {
  expiresIn: '13d',
  algorithm: 'HS256',
};

const createToken = (userData) => jwt.sign({ data: userData }, TOKEN_SECRET, jwtConfig);

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);

    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
  createToken,
  verifyToken,
};
