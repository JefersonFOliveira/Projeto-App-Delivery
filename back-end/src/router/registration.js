const { Router } = require('express');
const registrationValidate = require('../validations/validates');
const userController = require('../controllers/userController');

const router = Router();

router.post(
  '/',
  registrationValidate.validateRegistration,
  userController.create,
);
router.post(
  '/admin',
  registrationValidate.validateRegistration,
  userController.createByAdmin,
);

module.exports = router;
