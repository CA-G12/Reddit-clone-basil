const { getPostsQuery } = require('../database/queries');

const getAllPosts = (req, res) => {
  getPostsQuery().then((data) => res.json(data.rows));
};

module.exports = getAllPosts;
