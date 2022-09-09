const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');
const { addLikeQuery, removeLikeQuery, checkLikeQuery } = require('./like');
const {
  userPostsQuery, createPostQuery, deletePostQuery, updateUserDataQuery, userDataQuery,
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
  addLikeQuery,
  removeLikeQuery,
  checkLikeQuery,
};
