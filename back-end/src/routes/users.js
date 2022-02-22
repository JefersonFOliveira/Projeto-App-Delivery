const express = require('express');
const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/users');

const routes = express.Router();

routes.post('/', usersMiddleware.validateLogin, usersController.login);

module.exports = routes;
