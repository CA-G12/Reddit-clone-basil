const { Router } = require('express');
const {
  signUp, login, getAllPosts, createPost, deletePost, logOut,
} = require('../controllers');

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/posts', getAllPosts);
router.post('/addpost', createPost);
router.delete('/delete/post/:id', deletePost);
router.get('/logout', logOut);

module.exports = router;
