const { getPostsQuery } = require('../../database/queries');

const getAllPosts = (req, res) => {
  getPostsQuery()
    .then((data) => res.json(data.rows))
    .catch(() => res.status(500).json({ error: 'somthing went wrong' }));
};

module.exports = getAllPosts;
