const connection = require('../../config/connection');

const userPostsQuery = (id) => connection.query('SELECT COUNT(*) AS likeNum, posts.id, users.username, users.img_url AS userImg, posts.post, posts.post_date AS postDate, posts.post_img AS postImg FROM posts JOIN users ON users.id = posts.user_id LEFT JOIN likes ON posts.id = likes.post_id WHERE posts.user_id = $1 GROUP BY(likes.post_id, users.username, posts.post, users.img_url, posts.post_date, posts.id, posts.post_img)', [id]);

module.exports = userPostsQuery;
