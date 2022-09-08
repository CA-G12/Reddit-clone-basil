const signUp = require('./signUp');
const login = require('./login');
const getAllPosts = require('./getAllPosts');
const createPost = require('./createPost');
const deletePost = require('./deletePost');
const logOut = require('./logout');
const userData = require('./userData');

module.exports = {
  signUp, login, getAllPosts, createPost, deletePost, logOut, userData,
};
