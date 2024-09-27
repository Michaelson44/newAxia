const express = require("express");
const router = express.Router();
const { register, login, logOut, oAuthRegister } = require("../controller/auth");

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);
router.post('/oauth', oAuthRegister);

module.exports = router;