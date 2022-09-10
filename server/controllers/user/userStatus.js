const { userStatusQuery } = require('../../database/queries');
const { AuthHelpers } = require('../../helpers');

const userStatus = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    next();
  }
  const { token } = req.cookies;
  const { status } = req.body;
  AuthHelpers.checkPayload(token)
    .then(({ id }) => userStatusQuery({ status, id }))
    .then(({ rowCount }) => {
      if (rowCount) {
        res.json({ message: 'status update' });
      }
    }).catch(() => res.status(500).json('something went wrong'));
};

module.exports = userStatus;
