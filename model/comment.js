const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    comment: {
        type: String,
        require: true
    },
    postId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "post"
    },
    commentorId: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: "blogs"
    }
},  {timestamps: true});

const commentModel = mongoose.model("comments", schema);
module.exports = commentModel;