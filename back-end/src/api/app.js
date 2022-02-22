const express = require('express');
const usersRoute = require('../routes/users');
const errors = require('../errors/errors');

const app = express();
app.use(express.json());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use('/user', usersRoute);
app.use(errors);

module.exports = app;
