const joi = require('joi');

const loginValidationSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30),
  password: joi.string().alphanum(),
});

module.exports = loginValidationSchema;
