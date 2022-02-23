const { Router } = require('express');

const path = require('path');
const { HTTP_OK_STATUS } = require('../errors/errors');

const router = Router();

router.get('/:file', (req, res) => {
  const { file } = req.params;
  res.status(HTTP_OK_STATUS).sendFile(path.resolve(__dirname, `../../public/${file}`));
});

module.exports = router;
