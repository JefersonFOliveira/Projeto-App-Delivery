const Joi = require('joi');

const validateLogin = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

const validateCreate = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = {
  validateLogin,
  validateCreate,
};
