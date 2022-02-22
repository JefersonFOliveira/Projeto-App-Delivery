const express = require('express');
const bodyParser = require('body-parser');
const loginRouter = require('../router/login')

const app = express();
app.use(bodyParser.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);

module.exports = app;
