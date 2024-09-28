const bcrypt = require("bcryptjs");
const userModel = require("../model/user");
const jwt = require("jsonwebtoken");

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
        // const userInfo = {info: user};
        
        const about = {id: user.id, role: user.role};
        const token = jwt.sign(about, process.env.SECRET);
        res.cookie("token", token);
        res.json({userInfo: user});
    } catch (error) {
        console.log(error.message);
        res.json(error.message);
    }
}

const logOut = async (req, res) => {
    try {
        res.clearCookie("user_token").status(200)
                                    .json({message: "user has been logged out"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

const oAuthRegister = async (req, res) => {
    const {username, email, gender} = req.body;
    // first get the user and check if they already have credentials account
    try {
        const user = await userModel.findOne({email});
        if (user && user.credentialsAccount) {
            return res.status(402).json({error: "invalid credentials"});
        }
        // now check if they have already have oaut account
        if (user) {
            const about = {id: user.id, role: user.role};
            const token = jwt.sign(about, process.env.SECRET);
            return res.cookie("token", token)
                        .status(200).json({message: "user logged in successfully"});
        }
        // then register user if they dont have oaut account 
        const newUser = new userModel({username, email, gender, credentialsAccount: false});
        const savedUser = await newUser.save();
        const about = {id: savedUser.id, role: savedUser.role};
        const token = jwt.sign(about, process.env.SECRET);
        res.cookie("token", token)
                    .status(200).json({message: "user logged in successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
}

module.exports = {register, login, logOut, oAuthRegister};