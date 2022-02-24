const { Sale, SalesProducts, Product, User } = require('../database/models');
const status = require('../utilities/statusCodes');

async function create(body) {
  const { userId, sellerId, products, totalPrice, deliveryAddress, deliveryNumber } = body;
  const createdUser = await Sale.create(
    { 
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      saleDate: new Date(),
    },
    );

  products.forEach(async (product) => {
    const { id, quantity } = product;
    await SalesProducts
    .create({ saleId: createdUser.dataValues.id, productId: id, quantity });
  });

  return { data: createdUser.dataValues.id, code: status.CREATED };
}

async function getSeller(id) {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password', 'email'] },
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
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'quantityTotal' } },
    ],
  });

  if (order.length <= 0) return { code: status.NOT_FOUND, error: 'Sale does not exist' };

  return { data: order, code: status.OK };
}

async function getByOrderId(id) {
  const order = await Sale.findOne({
    where: { id },
    include: [
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'quantityTotal' } },
    ],
  });

  if (!order) return { code: status.NOT_FOUND, error: 'Sale does not exist' };

  const { seller_id: sellerId } = order;
  const seller = await getSeller(sellerId);
  const orderInfo = { ...order.dataValues, seller };

  return { data: orderInfo, code: status.OK };
}

module.exports = {
  create,
  getByUserId,
  getByOrderId,
};
