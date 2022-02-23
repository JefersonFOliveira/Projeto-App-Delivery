const { HTTP_NOT_FOUND } = require('../middlewares/status');
const productService = require('../service/productService');

async function getAll(_req, res) {
  try {
    const { code, error, data } = await productService.getAll();

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch (err) {
    return res.status(HTTP_NOT_FOUND).json({ error: err.message });
  }
}

module.exports = {
  getAll,
};
