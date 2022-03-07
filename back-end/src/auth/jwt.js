require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = 'senhasecreta';

const generateToken = (payload) => jwt.sign(payload, secret);

const verifyToken = (token) => jwt.verify(token, secret);

module.exports = {
  generateToken,
  verifyToken,
};
