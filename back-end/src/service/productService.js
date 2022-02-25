const { Product } = require('../database/models');
const statusCode = require('../utilities/statusCodes');

  async function getAll() {
    const products = await Product.findAll();
    if (!products) return { status: statusCode.CONFLICT, message: 'Products are empty' };
  
    return { data: products, code: statusCode.OK };
  }
  
  module.exports = {
    getAll,
  }; 