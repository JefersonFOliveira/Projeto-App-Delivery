const statusCode = require('../utilities/statusCodes');
const productService = require('../service/productService');

async function getAll(_req, res) {
  try {
    const { code, error, data } = await productService.getAll();

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch (err) {
    return res.status(statusCode.NOT_FOUND).json({ error: err.message });
  }
}

module.exports = {
  getAll,
};
