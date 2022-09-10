const { removeLikeQuery, checkLikeQuery } = require('../../database/queries');
const { AuthHelpers, GenericError } = require('../../helpers');

const removeLike = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    next();
  }

  const { token } = req.cookies;
  const { id } = req.params;
  let userId;

  AuthHelpers.checkPayload(token)
    .then((data) => {
      userId = data.id;
      return checkLikeQuery({ userId, postId: id });
    })
    .then(({ rowCount }) => {
      if (!rowCount) {
        throw new GenericError(404, 'page not found');
      }
      return removeLikeQuery({ userId, postId: id });
    })
    .then(({ rowCount }) => {
      if (!rowCount) {
        throw new GenericError(500, 'something went wrong');
      }
      res.json({ message: 'success' });
    })
    .catch((err) => res.status(err.status || 500).json({ error: err.msg || 'something went wrong' }));
};

module.exports = removeLike;
