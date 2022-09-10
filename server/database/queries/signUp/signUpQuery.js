const connection = require('../../config/connection');

const signUpQuery = ({
  firstName, lastName, userName, email, hashed, status, imgUrl,
}) => connection.query(
  'INSERT INTO users (first_name, last_name, username, email, password, user_status, img_url) values ($1, $2, $3, $4, $5, $6, $7)',
  [firstName, lastName, userName, email, hashed, status, imgUrl],
);

module.exports = signUpQuery;
