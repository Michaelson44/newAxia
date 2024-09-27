const express = require('express');
const { makePost, getPosts, getSinglePost, likePost } = require('../controller/post');
const { verify } = require('../middleware/verify');
const router = express.Router();

router.post('/post',verify, makePost);
router.get('/post', getPosts);
router.get('/post', getSinglePost);
router.put('/likes', likePost);

module.exports = router;