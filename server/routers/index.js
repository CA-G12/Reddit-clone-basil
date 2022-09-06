const { Router } = require('express');
const { signUp, login, getAllPosts } = require('../controllers');

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/posts', getAllPosts);

module.exports = router;
