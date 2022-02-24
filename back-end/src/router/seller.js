const { Router } = require('express');

const userController = require('../controllers/userController');
const saleController = require('../controllers/saleController');

const router = Router();

router.get(
  '/',
  userController.getByRole,
);

router.put(
  '/orders/:id',
  saleController.updateStatus,
);

module.exports = router;