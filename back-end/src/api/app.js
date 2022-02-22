const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const loginRouter = require('../router/login')
const productRouter = require('../router/product');


const app = express();
app.use(bodyParser.json());

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRouter);

app.use('/products', productRouter);

module.exports = app;
