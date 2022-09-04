const connection = require('../../config/connection');

const signUpQuery = ({
  firstName, lastName, username, email, hashed, imgUrl,
}) => connection.query(
  'INSERT INTO users (first_name, last_name, username, email, password, img_url) values ($1, $2, $3, $4, $5, $6)',
  [firstName, lastName, username, email, hashed, imgUrl],
);

module.exports = signUpQuery;
