const signUp = require('./signUp');
const login = require('./login');
const getAllPosts = require('./getAllPosts');
const createPost = require('./createPost');
const deletePost = require('./deletePost');
const logOut = require('./logout');
const userData = require('./userData');
const updateUserDate = require('./updateUserData');
const userPosts = require('./userPosts');
const addLike = require('./addLike');
const removeLike = require('./removeLike');

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
};
