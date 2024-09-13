const commentModel = require("../model/comment");
const postModel = require("../model/post");

const makeComment = async (req, res) => {
    // get comment, postId from body
    const {comment, postId, commentorId} = req.body;
    const newUser = new commentModel({comment, postId, commentorId});
    try {
        const savedUser = await newUser.save();
        // modify the comment field in post model
        await postModel.findByIdAndUpdate(postId, {$push: {comments: savedUser.id}});
        res.json({message: "post has been made"});
    } catch (error) {
        res.json(error.message);
    }
};

const getComments = async (req, res) => {
    try {
        const allComment = await commentModel.find().populate({path: "postId", select: "title desc"})
                                            .populate({path: "commentorId", select: "username email gender"});
        res.json(allComment);
    } catch (error) {
        res.json(error.message);
    }
}


module.exports = {makeComment, getComments};