const { userDataQuery, checkUserName, updateUserDataQuery } = require('../database/queries');
const { updateValidationSchema, validate } = require('../validation');
const { GenericError, AuthHelpers } = require('../helpers');

const updateUserDate = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    res.json({ message: 'no token' });
    return;
  }

  const {
    firstName, lastName, username, email, imgUrl,
  } = req.body;

  validate(updateValidationSchema, {
    firstName, lastName, username, email, imgUrl,
  })
    .then(() => checkUserName(username))
    .then((data) => {
      if (data.rowCount !== 0) {
        throw new GenericError(400, 'Username already exists');
      }
    })
    .then(() => AuthHelpers.checkPayload(isLoged))
    .then(({ id }) => userDataQuery(id))
    .then((data) => {
      if (data.rowCount === 0) {
        res.clearCookie('token');
        next();
      }
      return data.rows[0].id;
    })
    .then((id) => updateUserDataQuery({
      firstName, lastName, username, email, imgUrl, id,
    }))
    .then((result) => {
      if (result.rowCount === 1) {
        res.json({ message: 'Update Profile Successfuly' });
      }
    })
    .catch((error) => res.status(error.status || 500).json({ error: error.msg || 'Something Went Wrong' }));
};

module.exports = updateUserDate;
