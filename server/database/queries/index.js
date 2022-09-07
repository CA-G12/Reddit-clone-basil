const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');
const createPostQuery = require('./createPostQuery');

module.exports = {
  signUpQuery,
  checkUserName,
  userPassword,
  getPostsQuery,
  createPostQuery,
};
