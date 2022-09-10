const { deletePostQuery } = require('../../database/queries');
const { AuthHelpers } = require('../../helpers');

const deletePost = (req, res, next) => {
  const { id } = req.params;
  const { token } = req.cookies;
  AuthHelpers.checkPayload(token)
    .then(() => deletePostQuery(id))
    .then((data) => {
      if (data.rowCount === 1) {
        res.json({ message: 'Post deleted successfuly' });
      }
      next();
    })
    .catch((err) => next(err));
};

module.exports = deletePost;
