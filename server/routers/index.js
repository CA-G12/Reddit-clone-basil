const { Router } = require('express');

const {
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
} = require('../controllers');

const router = Router();

router.get('/user', userData);
router.post('/signup', signUp);
router.post('/login', login);
router.get('/posts', getAllPosts);
router.get('/user-posts', userPosts);
router.post('/addpost', createPost);
router.delete('/delete/post/:id', deletePost);
router.post('/updateuser', updateUserDate);
router.get('/logout', logOut);
router.post('/like/add/:id', addLike);
router.delete('/like/down/:id', removeLike);

module.exports = router;
