const connection = require('../../config/connection');

const userDataQuery = (id) => connection.query('SELECT username, first_name, last_name, email, img_url AS userimg, user_status AS userStatus, id FROM users WHERE id=$1', [id]);

module.exports = userDataQuery;
