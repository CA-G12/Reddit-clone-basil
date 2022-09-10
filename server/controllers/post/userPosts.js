const { userPostsQuery } = require('../../database/queries');
const { AuthHelpers } = require('../../helpers');

const userPosts = (req, res, next) => {
  const { token } = req.cookies;
  AuthHelpers.checkPayload(token)
    .then(({ id }) => userPostsQuery(id))
    .then((data) => {
      res.json(data.rows);
    }).catch((err) => {
      res.status(500);
      next(err);
    });
};

module.exports = userPosts;
