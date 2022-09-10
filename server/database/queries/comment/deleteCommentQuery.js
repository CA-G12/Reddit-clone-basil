const connection = require('../../config/connection');

const deleteCommentQuery = (commentId) => connection.query('DELETE FROM comments WHERE id = $1', [commentId]);

module.exports = deleteCommentQuery;
