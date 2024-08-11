const userModel = require("../model/user");

const postUser = async (req, res) => {
    const body = req.body;
    try {
        const newUser = new userModel(body);
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (error){
        res.json({error: error.message});
    }
};

const getUser = async (req, res) => {
    try {
        const allUser = await userModel.find().sort({createdAt: -1});
        res.json(allUser);
    } catch (error) {
        res.json({error: error.message});
    }
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {password} = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, {password}, {new: true});
        res.json(updatedUser);
    } catch (error) {
        res.json({error: error.message});
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedUser = await userModel.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        res.json({error: error.message});
    }
}

module.exports = {postUser, getUser, updateUser, deleteUser};