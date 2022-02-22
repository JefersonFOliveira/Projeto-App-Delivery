const { HTTP_NOT_FOUND } = require('../middlewares/status');
const saleService = require('../services/saleService');

async function create(req, res) {
  try {
    console.log(req.body);
    const { code, data } = await saleService.create(req.body);

    return res.status(code).json(data);
  } catch(err) {
    return res.status(HTTP_NOT_FOUND).json({ error: err.message });
  }
};

async function getByUserId(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user.data;
    const { code, error, data } = await saleService.getByUserId(id, role);

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch(err) {
    return res.status(HTTP_NOT_FOUND).json({ error: err.message });
  }
};

async function getByOrderId(req, res) {
  try {
    const { id } = req.params;
    const { code, error, data } = await saleService.getByOrderId(id);

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch(err) {
    return res.status(HTTP_NOT_FOUND).json({ error: err.message });
  }
};

module.exports = {
  create,
  getByUserId,
  getByOrderId,
}