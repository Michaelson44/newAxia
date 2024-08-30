const userModel = require("../model/user");
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    // get password from body to hash and spread others
    const {password, ...others} = req.body;
    // generate salt and hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    // now create a new instance of user model
    const newUser = new userModel({...others, password: hashedPassword});
    try {
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.json({error: error.message});
    }
};

const login = async (req, res) => {
    // get the email and password from req body
    const {email, password} = req.body;
    // check if user exist
    try {
        const user = await userModel.findOne({email});
        if (!user) {
            return res.json("user does not exist");
        }
        // check if password is correct
        const verify = bcrypt.compareSync(password, user.password);
        if (!verify) {
            return res.json("password does not match");
        }
        
        res.json({userInfo: user});
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
    
}

module.exports = {register, login};