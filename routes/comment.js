const express = require("express");
const { makeComment, getComments } = require("../controller/comment");
const { verify } = require("../middleware/verify");

const router = express.Router();

router.post("/comment", verify, makeComment);
router.get("/comment", getComments);

module.exports = router;