const { Router } = require('express');
const loginValidate = require('../validations/validates');
const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/',
  loginValidate.validateLogin,
  userController.login,
);

module.exports = router;
