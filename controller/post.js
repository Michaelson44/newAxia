const postModel = require("../model/post");

const makePost = async (req, res) => {
    // create a new instance of post model to create a post
    // const post = new postModel(req.body);
    const {creatorId, ...others} = req.body;
    const {id} = req.user;
    console.log(id);
    console.log(req.user);
    // create new instance of post model
    const post = new postModel({...others, creatorId: id});
    try {
        await post.save();
        res.json({message: "post has been created successfully"});
    } catch (error) {
        console.log(error)
        res.json({error: error.message});
    }
}

const getPosts = async (req, res) => {
    // get posts in try catch block
    try{
        const allPost = await postModel.find().populate({path: "comments", select: "comment commentorId"})
                                        .populate({path: "creatorId", select: "username gender email"});
        res.json(allPost);
    } catch (error) {
        res.json(error.message);
    }
}

const getSinglePost = async (req, res) => {
    const {id} = req.query;
    // find post by id
    try {
        const onePost = await postModel.findById(id).populate({path: "comments", select: "comment commentorId"})
                                        .populate({path: "creatorId", select: "username gender email"});
        res.json(onePost);
    } catch (error) {
        res.json(error.message);
    }
};

const likePost = async (req, res) => {
    // get post id and user id from body
    const {id, userId} = req.body;
    const post = await postModel.findById(id);
    if (!post) {
        return res.json("post unavailable");
    }
    // get likes array from post to alter it
    const gottenLikes = post.likes;
    // verify if user id already exist in array
    const check = gottenLikes.includes(userId);
    if (!check) {
        gottenLikes.push(userId);
    } else {
        // get user index and splice to remove
        const index = gottenLikes.indexOf(userId);
        gottenLikes.splice(index, 1);
    }
    // add updated array to database
    try {
        await postModel.findByIdAndUpdate(id, {likes: gottenLikes});
        check ? res.json("post has been liked") : 
        res.json("post has been disliked")
    } catch (error) {
        res.json(error.message);
    }
}

module.exports = {makePost, getPosts, getSinglePost, likePost};