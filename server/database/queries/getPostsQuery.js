const connection = require('../config/connection');

const getPostsQuery = () => connection.query('SELECT COUNT(*) AS likeNum, users.username, users.img_url, posts.post, posts.post_date FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON posts.id = likes.post_id GROUP BY(likes.post_id, users.username, posts.post, users.img_url, posts.post_date)');

module.exports = getPostsQuery;
