const { Product } = require('../../database/models');

const findAllProducts = () => Product.findAll();

module.exports = {
  findAllProducts,
};