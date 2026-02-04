const express=require("express");
const { createPost, getPosts } = require("../controllers/post.controller");
const upload = require("../middlewares/post.middleware");
const authUser = require("../middlewares/authUser.middlewre");
const postRouter=express.Router();

postRouter.post('/postCreate/:id' , authUser,  upload.array('medias'),createPost);
postRouter.get('/posts' ,   authUser, getPosts);

module.exports=postRouter;