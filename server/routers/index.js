const { Router } = require('express');
const {
  signUp, login, getAllPosts, createPost,
} = require('../controllers');

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/posts', getAllPosts);
router.post('/addpost', createPost);

module.exports = router;
