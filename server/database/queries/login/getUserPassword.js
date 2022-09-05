const connection = require('../../config/connection');

const userPassword = (username) => connection.query('SELECT password, id FROM users WHERE username = $1', [username]);

module.exports = userPassword;
