const { createPostQuery } = require('../database/queries');
const { AuthHelpers } = require('../helpers');

const createPost = (req, res, next) => {
  const { content } = req.body;
  const { token } = req.cookies;
  AuthHelpers.checkPayload(token)
    .then((data) => createPostQuery({ content, userId: data.id }))
    .then(() => res.json({ message: 'Created Post Successfuly' }))
    .catch((err) => next(err));
};

module.exports = createPost;
