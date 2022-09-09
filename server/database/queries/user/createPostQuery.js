const connection = require('../../config/connection');

const createPostQuery = ({ content, userId, postImg }) => connection.query('INSERT INTO posts (post, user_id, post_img) VALUES ($1, $2, $3)', [content, userId, postImg]);

module.exports = createPostQuery;
