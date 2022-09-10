const connection = require('../../config/connection');

const getCommentsQuery = (postId) => connection.query('SELECT comments.id AS commentId, users.username, users.img_url AS userImg, comments.post_id AS postId, comments.content FROM comments LEFT JOIN users on users.id = comments.user_id WHERE post_id = $1', [postId]);

module.exports = getCommentsQuery;
