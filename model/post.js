const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    creatorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    likes: {
        type: [mongoose.Types.ObjectId],
        default: []
    }
}, {timestamps: true});

const postModel = mongoose.model("post", schema);
module.exports = postModel;