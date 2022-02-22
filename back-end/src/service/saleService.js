const { Sale, SalesProducts, Product, User } = require('../models');
const { HTTP_CREATED, HTTP_OK_STATUS, HTTP_NOT_FOUND } = require('../middlewares/status');


async function create(body) {
  const statusOrder = 'Pendente';
  const { userId, sellerId, products, totalPrice, deliveryAddress, deliveryNumber } = body;
  const saleId = await Sale.create({ user_id: userId, seller_id: sellerId, total_price: totalPrice, delivery_address: deliveryAddress, delivery_number: deliveryNumber, sale_date: new Date(), status: statusOrder });

  products.forEach(async (product) => {
    const { id, quantity } = product;
    await SalesProducts.create({ sale_id: saleId.dataValues.id , product_id: id, quantity: quantity })
  });

  return { data: saleId.dataValues.id, code: HTTP_CREATED };
};

async function getSeller(id) {
  const user = await User.findOne({
    where: { id },
    attributes: {exclude: ['password', 'email']}
  });

  return user;
}

async function getByUserId(id, role) {
  let checkUserId = '';

  if (role === 'customer') {
    checkUserId = 'user_id';
  } if (role === 'seller') {
    checkUserId = 'seller_id';
  }

  const order = await Sale.findAll({
    where: { [checkUserId]: id },
    include: [
      { model: Product, as:'products', through: { attributes: ['quantity'], as: 'quantityTotal' } },
    ],
  });

  if (order.length <= 0) return { code: HTTP_NOT_FOUND, error: 'Sale does not exist' };

  return { data: order, code: HTTP_OK_STATUS };
};

async function getByOrderId(id) {
  const order = await Sale.findOne({
    where: { id },
    include: [
      { model: Product, as:'products', through: { attributes: ['quantity'], as: 'quantityTotal' } },
    ],
  });

  if (!order) return { code: HTTP_NOT_FOUND, error: 'Sale does not exist' };

  const { seller_id: sellerId } = order;
  const seller = await getSeller(sellerId);
  const orderInfo = {...order.dataValues, seller};

  return { data: orderInfo, code: HTTP_OK_STATUS };
}

module.exports = {
  create,
  getByUserId,
  getByOrderId,
};