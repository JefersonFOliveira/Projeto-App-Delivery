const status = require('../utilities/statusCodes');
const saleService = require('../service/saleService');

async function create(req, res) {
  try {
    const { code, data } = await saleService.create(req.body);

    return res.status(code).json(data);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

async function getByUserId(req, res) {
  try {
    const { id } = req.params;
    const { role } = req.user.data;
    const { code, error, data } = await saleService.getByUserId(id, role);

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

async function getByOrderId(req, res) {
  try {
    const { id } = req.params;
    const { code, error, data } = await saleService.getByOrderId(id);

    if (error) return res.status(code).json({ error });

    return res.status(code).json(data);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

async function updateStatus(req, res) {
  try {
    const { id } = req.params;
    const { statusOrder } = req.body;
    const { statusUpdated, code } = await saleService.updateStatusService(id, statusOrder);

    return res.status(code).json(statusUpdated);
  } catch (err) {
    return res.status(status.NOT_FOUND).json({ error: err.message });
  }
}

module.exports = {
  create,
  getByUserId,
  getByOrderId,
  updateStatus,
};
