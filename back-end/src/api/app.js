const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('../router/login')
const productRouter = require('../router/product');
const registrationRouter = require('../router/registration');
const saleRouter = require('../router/sale')

const app = express();
app.use(bodyParser.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);

app.use('/products', productRouter);
app.use('/orders', saleRouter);

module.exports = app;
