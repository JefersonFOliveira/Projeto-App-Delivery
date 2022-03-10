const { Sale, SalesProducts, Product, User } = require('../database/models');
const statusCode = require('../utilities/statusCodes');

async function create(body) {
  const statusOrder = 'pendente';
  const { userId, sellerId, products, totalPrice, deliveryAddress, deliveryNumber } = body;

  const createdUser = await Sale.create(
    { 
      userId,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: statusOrder,
    },
  );

  products.forEach(async (product) => {
    const { id, quantity } = product;
    await SalesProducts
    .create({ saleId: createdUser.dataValues.id, productId: id, quantity });
  });

  return { data: createdUser.dataValues.id, code: statusCode.CREATED };
}

async function getAllSales() {
  const sales = await Sale.findAll();

  return { data: sales, code: statusCode.OK };
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

  if (order.length <= 0) return { code: statusCode.NOT_FOUND, error: 'Sale does not exist' };

  return { data: order, code: statusCode.OK };
}

async function getByOrderId(id) {
  const order = await Sale.findOne({
    where: { id },
    include: [
    { model: Product, as: 'products', through: { attributes: ['quantity'], as: 'quantityTotal' } },
    ],
  });

  if (!order) return { code: statusCode.NOT_FOUND, error: 'Sale does not exist' };

  const { sellerId } = order;
  const seller = await getSeller(sellerId);
  const orderInfo = { ...order.dataValues, seller };

  return { data: orderInfo, code: statusCode.OK };
}

async function updateStatusService(id, status) {
  await Sale.update({ status }, { where: { id } });

 return { statusUpdated: true, code: statusCode.OK };
}

module.exports = {
  create,
  getByUserId,
  getByOrderId,
  updateStatusService,
  getAllSales,
};
