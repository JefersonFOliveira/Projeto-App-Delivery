const Joi = require('joi');

const validateLogin = (req, res, next) => {
  const { error } = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(req.body);

  if (error) return next(error);

  next();
};

module.exports = {
  validateLogin,
};
