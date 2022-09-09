const connection = require('../../config/connection');

const checkLikeQuery = ({ userId, postId }) => connection.query('SELECT user_id, post_id FROM likes WHERE user_id = $1 AND post_id = $2', [userId, postId]);

module.exports = checkLikeQuery;
