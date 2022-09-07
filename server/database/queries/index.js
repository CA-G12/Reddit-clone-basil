const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');
const createPostQuery = require('./createPostQuery');
const deletePostQuery = require('./deletePostQuery');

module.exports = {
  signUpQuery,
  checkUserName,
  userPassword,
  getPostsQuery,
  createPostQuery,
  deletePostQuery,
};
