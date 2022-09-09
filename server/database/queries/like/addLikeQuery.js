const connection = require('../../config/connection');

const addLikeQuery = ({ userId, postId }) => connection.query('INSERT INTO likes (user_id, post_id) VALUES ($1, $2)', [userId, postId]);

module.exports = addLikeQuery;
