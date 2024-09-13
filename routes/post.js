const express = require('express');
const { makePost, getPosts, getSinglePost, likePost } = require('../controller/post');
const router = express.Router();

router.post('/post', makePost);
router.get('/post', getPosts);
router.get('/post', getSinglePost);
router.put('/likes', likePost);

module.exports = router;