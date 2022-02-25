const { Router } = require('express');

const path = require('path');
const status = require('../utilities/statusCodes');

const router = Router();

router.get('/:file', (req, res) => {
  const { file } = req.params;
  res.status(status.OK).sendFile(path.resolve(__dirname, `../../public/${file}`));
});

module.exports = router;
