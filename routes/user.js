const express = require("express");
const {updateRole, updatePassword, updateUserInfo, deleteUser} = require("../controller/user");
const { verify } = require("../middleware/verify");
const router = express.Router();

router.put('/change-role', verify, updateRole)
router.put('/change-password',verify, updatePassword);
router.put('/chage_user-info', verify, updateUserInfo);
router.delete('/delete-user', verify, deleteUser);

module.exports = router;