const { Router } = require('express');

const saleController = require('../controllers/saleController');
const tokenValidate = require('../validations/validadeJWT');

const router = Router();

router.get(
  '/:id',
  tokenValidate.verifyToken,
  saleController.getByUserId,
);

router.get(
  '/orders',
  tokenValidate.verifyToken,
  saleController.getByUserId,
);

module.exports = router;
