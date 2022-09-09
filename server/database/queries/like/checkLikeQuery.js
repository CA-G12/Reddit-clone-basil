const connection = require('../../config/connection');

const checkLikeQuery = ({ userId, postId }) => connection.query('SELECT user_id, post_id, CASE WHEN (user_id = $1) AND (post_id = $2) THEN "true" ELSE "false" END AS result FROM likes', [userId, postId]);

module.exports = checkLikeQuery;
