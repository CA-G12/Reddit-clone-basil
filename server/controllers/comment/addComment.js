const { addCommentQuery } = require('../../database/queries');
const { AuthHelpers, GenericError } = require('../../helpers');

const addComment = (req, res, next) => {
  const isLoged = req.cookies.token;
  if (!isLoged) {
    throw new GenericError(400, 'not loged in');
  }

  const { postId, content } = req.body;
  const { token } = req.cookies;

  AuthHelpers.checkPayload(token)
    .then((data) => addCommentQuery({ content, userId: data.id, postId }))
    .then(({ rowCount }) => {
      if (rowCount) {
        res.json({ message: 'comment added' });
      }
    }).catch((err) => res.status(err.status || 500).json({ error: err.msg || 'somthing went wrong' }));
};

module.exports = addComment;
