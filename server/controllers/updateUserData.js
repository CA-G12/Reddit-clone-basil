const { userDataQuery, checkUserName, updateUserDataQuery } = require('../database/queries');
const { GenericError, AuthHelpers } = require('../helpers');

const updateUserDate = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    res.json({ message: 'no token' });
  }

  const {
    firstName, lastName, username, email,
  } = req.body;

  checkUserName(username).then((data) => {
    if (!(data.rowCount === 0)) {
      throw new GenericError(400, 'Username already exists');
    }
  })
    .then(() => AuthHelpers.checkPayload(isLoged))
    .then(({ id }) => userDataQuery(id))
    .then((data) => {
      if (data.rowCount === 0) {
        res.json({ message: 'no user' });
      }
      return data.rows[0].id;
    })
    .then((id) => updateUserDataQuery({
      firstName, lastName, username, email, id,
    }))
    .then((result) => {
      if (result.rowCount === 1) {
        res.json({ message: 'Update Profile Successfuly' });
      }
    })
    .catch((error) => res.status(error.status || 500).json({ error: error.msg || 'Something Went Wrong' }));
};

module.exports = updateUserDate;
