const connection = require('../config/connection');

const updateUserDataQuery = ({
  firstName, lastName, username, email, id,
}) => {
  console.log(id);
  return connection.query('UPDATE users SET first_name = $1, last_name = $2, username = $3, email = $4 WHERE id = $5 RETURNING id', [firstName, lastName, username, email, id]);
};

module.exports = updateUserDataQuery;
