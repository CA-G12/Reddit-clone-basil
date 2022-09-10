const connection = require('../../config/connection');

const addCommentQuery = ({ content, userId, postId }) => connection.query('INSERT INTO comments (content, user_id, post_id) VALUES ($1, $2, $3)', [content, userId, postId]);

module.exports = addCommentQuery;
