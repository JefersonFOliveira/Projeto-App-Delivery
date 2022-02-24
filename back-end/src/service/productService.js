const { Product } = require('../database/models');
const status = require('../utilities/statusCodes');

  async function getAll() {
    const products = await Product.findAll();
    if (!products) return { status: status.CONFLICT, message: 'Products are empty' };
  
    return { data: products, code: status.OK };
  }
  
  module.exports = {
    getAll,
  }; 