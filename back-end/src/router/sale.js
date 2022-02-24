const { Router } = require('express');

const saleController = require('../controllers/saleController');
const tokenValidate = require('../validations/validadeJWT');

const router = Router();

router.post(
  '/',
  tokenValidate.verifyToken,
  saleController.create,
);

router.get(
  '/costumer/:id',
  tokenValidate.verifyToken,
  saleController.getByUserId,
);

router.get(
  '/:id',
  tokenValidate.verifyToken,
  saleController.getByOrderId,
);

router.get(
  '/seller/:id',
  tokenValidate.verifyToken,
  saleController.getByUserId,
);

module.exports = router;
