const { deleteCommentQuery } = require('../../database/queries');
const { GenericError } = require('../../helpers');

const deleteComment = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    next();
  }
  const { id } = req.params;

  deleteCommentQuery(id)
    .then(({ rowCount }) => {
      if (!rowCount) {
        throw new GenericError(500, 'something went wrong');
      }
      res.json({ message: 'Comment was deleted' });
    }).catch((err) => res.status(err.status || 500).json({ error: err.msg || 'something went wrong' }));
};

module.exports = deleteComment;
