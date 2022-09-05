const validate = require('./validator');
const signUpValidationSchema = require('./signupValidation');
const loginValidationSchema = require('./loginValidation');

module.exports = {
  validate,
  signUpValidationSchema,
  loginValidationSchema,
};
