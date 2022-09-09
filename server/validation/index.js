const validate = require('./validator');
const signUpValidationSchema = require('./signupValidation');
const loginValidationSchema = require('./loginValidation');
const updateValidationSchema = require('./updateValidation');

module.exports = {
  validate,
  signUpValidationSchema,
  loginValidationSchema,
  updateValidationSchema,
};
