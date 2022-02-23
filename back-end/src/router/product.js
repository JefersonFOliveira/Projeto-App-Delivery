const { Router } = require('express');
const productController = require('../controllers/productController');
const tokenValidate = require('../validations/validadeJWT');

const router = Router();

router.get(
  '/',
  tokenValidate.verifyToken,
  productController.getAll,
);

module.exports = router;
