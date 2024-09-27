const userModel = require("../model/user");
const bcrypt = require('bcryptjs');

const updateRole = async (req, res) => {
    const {id} = req.body;
    const {role} = req.user;
    if (role !== "SuperAdmin" && role !== "Admin") {
        return res.status(402).json({error: "You don't have the auth to do this"})
    }
    try {
        await userModel.findByIdAndUpdate(id, {role: "Admin"}, {new: true});
        res.status(200).json({message: "role has been updated"})
    } catch (error) {
        res.status(504).json(error.message);
    }
};


const updatePassword = async (req, res) => {
    // get old password and new from body 
    const {oldPassword, newPassword} = req.body;
    const {id} = req.user;
    const user = await userModel.findById(id);
    // now we want to check if pass match with bcrypt
    const verify = bcrypt.compareSync(oldPassword, user.password);
    if (!verify) {
        return res.status(404).json({error: "password does not match"});
    }
    try {
        await userModel.findByIdAndUpdate(id, {password: newPassword}, {new: true});
        res.status(200).json({message: "password has been updated"});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
    
}

// now trying to update userInfo 

const updateUserInfo = async (req, res) => {
    // get the things you dont want user to update
    const {password, likes,  ...others} = req.body;
    const {id} = req.user;

    try {
        const user = await userModel.findById(id)
        if (password !== user.password) {
            return res.status(402).json({error: "you cant update others post"})
        }
        await userModel.findByIdAndUpdate(id, {...others}, {new: true});
        res.status(200).json({message: "user profile updated"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.user;
    try {
        await userModel.findByIdAndDelete(id);
        res.clearCookie("user_token")
            .status(200).json({message: "user has been deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}
module.exports = {updateRole, updatePassword, updateUserInfo, deleteUser};