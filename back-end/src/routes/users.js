const express = require('express');
const usersController = require('../controllers/users');
const usersMiddleware = require('../middlewares/users');

const routes = express.Router();

routes.post('/create', usersMiddleware.validateCreate, usersController.create);
routes.post('/login', usersMiddleware.validateLogin, usersController.login);

module.exports = routes;
