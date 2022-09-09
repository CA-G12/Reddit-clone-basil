const connection = require('../../config/connection');

const updateUserDataQuery = ({
  firstName, lastName, username, email, imgUrl, id,
}) => connection.query('UPDATE users SET first_name=$1, last_name=$2, username=$3, email=$4, img_url=$5 WHERE id=$6', [firstName, lastName, username, email, imgUrl, id]);

module.exports = updateUserDataQuery;
