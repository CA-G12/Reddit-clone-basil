const connection = require('../../config/connection');

const removeLikeQuery = ({ userId, postId }) => connection.query('DELETE FROM likes WHERE (user_id = $1) AND (post_id = $2)', [userId, postId]);

module.exports = removeLikeQuery;
