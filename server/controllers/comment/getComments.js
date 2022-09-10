const { getCommentsQuery } = require('../../database/queries');

const getComments = (req, res) => {
  const { postId } = req.body;
  getCommentsQuery(postId)
    .then(({ rows }) => res.json(rows))
    .catch(() => res.status(500).json({ error: 'somthing went wrong' }));
};

module.exports = getComments;
