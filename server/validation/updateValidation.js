const joi = require('joi');

const updateValidationSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string().alphanum().min(3).max(30),
  email: joi.string().email().required(),
  imgUrl: joi.string().empty(''),
});

module.exports = updateValidationSchema;
