// const Joi = require('joi');

// module.exports = (err, _req, res, _next) => {
//   try {
//     if (Joi.isError(err)) {
//       const { message } = err;
//       return res.status(400).json(message);
//     }
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
