const express = require("express");
const { makeComment, getComments } = require("../controller/comment");

const router = express.Router();

router.post("/comment", makeComment);
router.get("/comment", getComments);

module.exports = router;