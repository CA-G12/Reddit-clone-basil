const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');
const userDataQuery = require('./userDataQuery');
const {
  userPostsQuery, createPostQuery, deletePostQuery, updateUserDataQuery,
} = require('./user');

module.exports = {
  signUpQuery,
  checkUserName,
  userPassword,
  getPostsQuery,
  createPostQuery,
  deletePostQuery,
  userDataQuery,
  updateUserDataQuery,
  userPostsQuery,
};
