require('dotenv').config();
const { compare } = require('bcrypt');
const { loginValidationSchema } = require('../../validation');
const { validate } = require('../../validation');
const { GenericError, AuthHelpers } = require('../../helpers');
const { userPassword } = require('../../database/queries');

const login = (req, res) => {
  const isToken = req.cookies.token;
  if (isToken) {
    res.json({ message: 'loged in' });
    return;
  }
  const { username, password } = req.body;
  let user;
  validate(loginValidationSchema, { username, password })
    .then(() => userPassword(username))
    .then((data) => {
      user = data.rows[0];
      if (!user) {
        throw new GenericError(400, 'Incorrect username or password');
      }
      return compare(password, user.password);
    }).then((isPasswordMatched) => {
      if (!isPasswordMatched) {
        throw new GenericError(400, 'Incorrect username or password');
      }
      return AuthHelpers.genearteToken({ id: user.id });
    })
    .then((jwt) => res.cookie('token', jwt, { httpOnly: true }).json({ message: 'success' }))
    .catch((error) => res.status(error.error || 500).json({ error: error.msg || 'somthing went wrong' }));
};

module.exports = login;
