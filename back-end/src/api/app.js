const express = require('express');
// const cors = require('cors');

const loginRouter = require('../router/login');
const productRouter = require('../router/product');
const registrationRouter = require('../router/registration');
const saleRouter = require('../router/sale');
const imageRouter = require('../router/image');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/products', productRouter);
app.use('/orders', saleRouter);
app.use('/images', imageRouter);

module.exports = app;
