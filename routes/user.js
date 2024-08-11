const express = require("express");
const { getUser, postUser, updateUser, deleteUser } = require("../controller/user");
const router = express.Router();

router.get("/getUsers", getUser);
router.post("/postUser", postUser);
router.put("/postUser/:id", updateUser);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;