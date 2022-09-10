const { userDataQuery } = require('../../database/queries');
const { AuthHelpers } = require('../../helpers');

const userData = (req, res, next) => {
  const { token } = req.cookies;
  AuthHelpers.checkPayload(token)
    .then(({ id }) => userDataQuery(id))
    .then((data) => res.json(data.rows[0]))
    .catch((err) => next(err));
};

module.exports = userData;
