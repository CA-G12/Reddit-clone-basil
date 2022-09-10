const connection = require('../../config/connection');

const userStatusQuery = ({ status, id }) => connection.query('UPDATE users SET user_status = $1 WHERE id = $2', [status, id]);

module.exports = userStatusQuery;
