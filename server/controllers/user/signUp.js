const { hash } = require('bcrypt');
const { signUpValidationSchema } = require('../../validation');
const { validate } = require('../../validation');
const { GenericError } = require('../../helpers');
const { signUpQuery, checkUserName } = require('../../database/queries');

const signUp = (req, res) => {
  const {
    firstName, lastName, userName, email, password, confirmPassword, imgUrl, status,
  } = req.body;

  const formData = {
    firstName, lastName, userName, email, password, confirmPassword, imgUrl,
  };
  validate(signUpValidationSchema, formData)
    .then(() => checkUserName(userName))
    .then((data) => {
      if (!(data.rowCount === 0)) {
        throw new GenericError(400, 'Username already exists');
      }
    })
    .then(() => hash(password, 10))
    .then((hashed) => signUpQuery({
      firstName, lastName, userName, email, hashed, imgUrl, status,
    }))
    .then(() => res.json({ message: 'Account successfully created' }))
    .catch((error) => res.status(error.status || 500).json({ error: error.msg || 'Something Went Wrong' }));
};

module.exports = signUp;
