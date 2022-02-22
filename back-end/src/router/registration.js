const { Router } = require('express');
const registrationValidate = require('../validations/validates');
const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/',
  registrationValidate.validateRegistration,
  userController.create,
);

module.exports = router;
