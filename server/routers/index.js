const { Router } = require('express');
const {
  signUp, login, getAllPosts, createPost, deletePost, logOut, userData, updateUserDate, userPosts,
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

module.exports = router;
