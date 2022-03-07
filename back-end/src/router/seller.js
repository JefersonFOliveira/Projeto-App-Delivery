const { Router } = require('express');

// const userController = require('../controllers/userController');
const saleController = require('../controllers/saleController');
const tokenValidate = require('../validations/validadeJWT');

const router = Router();

router.get(
  '/orders',
  tokenValidate.verifyToken,
  saleController.getByUserId,
);

router.put(
  '/orders/:id',
  saleController.updateStatus,
);

module.exports = router;