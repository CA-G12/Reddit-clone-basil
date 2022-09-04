const joi = require('joi');

const signUpValidationSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  username: joi.string().alphanum().min(3).max(30),
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(7).max(30),
  confirmPassword: joi.ref('password'),
  imgUrl: joi.string(),
});

module.exports = signUpValidationSchema;
