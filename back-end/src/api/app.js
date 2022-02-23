const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');

const loginRouter = require('../router/login');
const productRouter = require('../router/product');
const registrationRouter = require('../router/registration');
const saleRouter = require('../router/sale');
const imageRouter = require('../router/image');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// const usersRoute = require('../routes/users');
// const errors = require('../errors/errors');

app.get('/coffee', (_req, res) => res.status(418).end());

// app.use('/user', usersRoute);

app.use('/login', loginRouter);
app.use('/registration', registrationRouter);
app.use('/products', productRouter);
app.use('/orders', saleRouter);
app.use('/images', imageRouter);
// app.use(errors);

module.exports = app;
