const { signUpQuery, checkUserName } = require('./signUp');
const { userPassword } = require('./login');
const getPostsQuery = require('./getPostsQuery');
const { addLikeQuery, removeLikeQuery, checkLikeQuery } = require('./like');
const { addCommentQuery, getCommentsQuery, deleteCommentQuery } = require('./comment');
const {
  userPostsQuery,
  createPostQuery,
  deletePostQuery,
  updateUserDataQuery,
  userDataQuery,
  userStatusQuery,
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
  addCommentQuery,
  getCommentsQuery,
  deleteCommentQuery,
  userStatusQuery,
};
