const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');

module.exports = {
  signUpQuery,
  checkUserName,
  userPassword,
  getPostsQuery,
};
