const { addComment, getComments, deleteComment } = require('./comment');

const {
  login, signUp, logOut, updateUserDate, userData,
} = require('./user');

const {
  getAllPosts, createPost, deletePost, userPosts,
} = require('./post');

const { addLike, removeLike } = require('./like');

module.exports = {
  signUp,
  login,
  getAllPosts,
  createPost,
  deletePost,
  logOut,
  userData,
  updateUserDate,
  userPosts,
  addLike,
  removeLike,
  addComment,
  getComments,
  deleteComment,
};
