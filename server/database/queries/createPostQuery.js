const connection = require('../config/connection');

const createPostQuery = ({ content, userId }) => connection.query('INSERT INTO posts (post, user_id) VALUES ($1, $2)', [content, userId]);

module.exports = createPostQuery;
