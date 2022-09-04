const connection = require('../../config/connection');

const checkUserName = (username) => connection.query('SELECT * FROM users WHERE username = $1', [username]);

module.exports = checkUserName;
