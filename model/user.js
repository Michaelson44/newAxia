const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"]
    },
    age: {
        type: Number
    },
    role: {
        type: String,
        required: true,
        enum: ["superAdmin", "Admin", "Basic"]
    },
    credentialsAccount: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const userModel = mongoose.model("blogs",userSchema);
module.exports = userModel;